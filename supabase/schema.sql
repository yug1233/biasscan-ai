-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscription_plan TEXT DEFAULT 'free',
  scan_count INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scans table
CREATE TABLE IF NOT EXISTS public.scans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  bias_metrics JSONB NOT NULL,
  overall_risk TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON public.scans(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON public.scans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON public.users(is_admin);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own scans" ON public.scans;
DROP POLICY IF EXISTS "Users can create own scans" ON public.scans;
DROP POLICY IF EXISTS "Users can delete own scans" ON public.scans;
DROP POLICY IF EXISTS "Users can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can create own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update all reviews" ON public.reviews;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Scans policies
CREATE POLICY "Users can view own scans"
  ON public.scans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scans"
  ON public.scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scans"
  ON public.scans FOR DELETE
  USING (auth.uid() = user_id);

-- Reviews policies - Regular users
CREATE POLICY "Users can view approved reviews or own reviews"
  ON public.reviews FOR SELECT
  USING (
    status = 'approved' 
    OR auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Users can create own reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews or admins can update any"
  ON public.reviews FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, is_admin)
  VALUES (
    NEW.id, 
    NEW.email,
    CASE 
      WHEN NEW.email LIKE '%@admin.biasscan.ai' THEN true
      ELSE false
    END
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop triggers if exist and recreate
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
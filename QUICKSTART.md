# 🚀 Quick Start Guide

Get BiasScan AI running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)
- 5 minutes of your time ⏱️

## Step 1: Clone & Install (1 min)

```bash
git clone https://github.com/yug1233/biasscan-ai.git
cd biasscan-ai
npm install
```

## Step 2: Set Up Supabase (2 min)

### Create Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Name it "biasscan-ai"
4. Choose a database password
5. Wait ~2 minutes for setup

### Apply Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this repo
4. Paste and click **Run**
5. You should see "Success. No rows returned"

### Get Your Keys
1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public** key

## Step 3: Configure Environment (1 min)

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx  # Optional for now
VITE_APP_URL=http://localhost:5173
```

## Step 4: Run the App (1 min)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## Step 5: Test It Out! 🎉

### Create an Account
1. Click "Get Started"
2. Sign up with email or Google
3. Check your email for verification (if using email signup)

### Upload a Test File
1. Go to "Upload" page
2. Use the sample CSV below or create your own
3. Drag & drop the file
4. Click "Analyze for Bias"
5. View your results!

### Sample Test CSV

Create a file called `test-dataset.csv`:

```csv
name,gender,age,race,department
John Smith,male,35,white,Engineering
Jane Doe,female,28,white,Engineering
Bob Johnson,male,42,white,Engineering
Alice Williams,female,31,white,Marketing
Charlie Brown,male,38,white,Engineering
Diana Prince,female,29,asian,Engineering
Eve Davis,female,33,white,Marketing
Frank Miller,male,45,white,Engineering
Grace Lee,female,27,asian,Engineering
Henry Wilson,male,40,white,Engineering
```

This dataset has:
- **Gender bias**: 60% male, 40% female
- **Race bias**: 80% white, 20% asian
- **Age range**: 27-45 years

BiasScan AI will detect these biases and provide recommendations!

## What's Next?

### Enable Google OAuth (Optional)
1. Go to Supabase → **Authentication** → **Providers**
2. Enable **Google**
3. Follow the setup instructions
4. Add your Google OAuth credentials

### Customize the App
- Edit `src/pages/LandingPage.jsx` for landing page content
- Modify `src/lib/biasDetection.js` for detection algorithms
- Update `tailwind.config.js` for theme colors

### Deploy to Production
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Troubleshooting

### "Cannot connect to Supabase"
- Check your `.env` file has correct credentials
- Verify Supabase project is not paused
- Make sure you ran the schema SQL

### "Build failed"
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Google OAuth not working"
- Make sure you enabled Google provider in Supabase
- Check redirect URLs are correct
- Verify Google OAuth credentials

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🐛 [Report an issue](https://github.com/yug1233/biasscan-ai/issues)
- 💬 Email: support@biasscan.ai

## Success! 🎊

You now have a fully functional bias detection tool running locally!

Try uploading different datasets and see how BiasScan AI detects various types of bias.

---

**Happy bias hunting! 🔍**
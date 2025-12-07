# 🚀 Deployment Guide for BiasScan AI

This guide covers deploying BiasScan AI to production environments.

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema applied (`supabase/schema.sql`)
- [ ] Environment variables ready
- [ ] Google OAuth configured (if using)
- [ ] Stripe account set up (if using payments)
- [ ] Domain name purchased (optional)

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers the best experience for React + Vite apps with automatic deployments.

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
vercel
```

#### Step 4: Add Environment Variables
Go to your Vercel project settings and add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_APP_URL` (your production URL)

#### Step 5: Redeploy
```bash
vercel --prod
```

### Option 2: Netlify

#### Step 1: Build the Project
```bash
npm run build
```

#### Step 2: Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

Or drag and drop the `dist` folder to Netlify's web interface.

#### Step 3: Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables, add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_APP_URL`

#### Step 4: Configure Redirects
Create `public/_redirects`:
```
/*    /index.html   200
```

### Option 3: GitHub Pages

#### Step 1: Update `vite.config.js`
```javascript
export default defineConfig({
  base: '/biasscan-ai/', // Your repo name
  // ... rest of config
})
```

#### Step 2: Build and Deploy
```bash
npm run build
npx gh-pages -d dist
```

### Option 4: Docker

#### Create `Dockerfile`
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Create `nginx.conf`
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Build and Run
```bash
docker build -t biasscan-ai .
docker run -p 80:80 biasscan-ai
```

## 🔧 Supabase Configuration

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project to be ready

### 2. Apply Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy contents from `supabase/schema.sql`
3. Click "Run" to execute

### 3. Configure Authentication

#### Email Authentication
1. Go to Authentication → Settings
2. Enable "Email" provider
3. Configure email templates (optional)

#### Google OAuth
1. Go to Authentication → Providers
2. Enable "Google" provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add authorized redirect URLs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `https://yourdomain.com/auth/callback`

### 4. Set Up Row Level Security
The schema already includes RLS policies. Verify they're enabled:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

### 5. Configure Storage (Optional)
If you want to store uploaded files:
1. Go to Storage
2. Create a new bucket: `datasets`
3. Set bucket to private
4. Add storage policies

## 🔐 Environment Variables

### Development (.env)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
VITE_APP_URL=http://localhost:5173
```

### Production
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
VITE_APP_URL=https://yourdomain.com
```

## 💳 Stripe Integration (Optional)

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create an account
3. Get your API keys

### 2. Create Products
1. Go to Products in Stripe dashboard
2. Create "Pro Plan" product
3. Set price to $5/month
4. Copy the price ID

### 3. Implement Checkout
Update `src/lib/stripe.js` (create if doesn't exist):
```javascript
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export const createCheckoutSession = async (priceId) => {
  const stripe = await stripePromise
  // Implement checkout logic
}
```

## 🌍 Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

## 📊 Analytics Setup

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `src/main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react'

// In your root component
<Analytics />
```

## 🔍 SEO Optimization

### 1. Update Meta Tags
Edit `index.html` with your production URLs and images.

### 2. Generate Sitemap
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/auth</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. Create robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## 🚨 Monitoring & Error Tracking

### Sentry (Recommended)
```bash
npm install @sentry/react
```

Configure in `src/main.jsx`:
```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
})
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## ✅ Post-Deployment Checklist

- [ ] Test all authentication flows
- [ ] Upload and scan a test file
- [ ] Verify PDF download works
- [ ] Test dark/light mode
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test error handling
- [ ] Check analytics tracking
- [ ] Verify SEO meta tags
- [ ] Test PWA installation
- [ ] Monitor error logs
- [ ] Set up uptime monitoring

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Supabase Connection Issues
- Verify environment variables are correct
- Check Supabase project is not paused
- Verify RLS policies are correct

### OAuth Not Working
- Check redirect URLs in Google Console
- Verify Supabase OAuth settings
- Ensure production URL is whitelisted

## 📞 Support

If you encounter issues:
1. Check the [GitHub Issues](https://github.com/yug1233/biasscan-ai/issues)
2. Review Supabase logs
3. Check browser console for errors
4. Contact support@biasscan.ai

---

**Happy Deploying! 🚀**
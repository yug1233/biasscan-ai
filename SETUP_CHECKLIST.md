# ✅ Setup Checklist for BiasScan AI

Use this checklist to ensure you've completed all setup steps correctly.

## 📋 Pre-Setup

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor ready (VS Code recommended)
- [ ] Supabase account created
- [ ] GitHub account (for deployment)

## 🔧 Local Development Setup

### 1. Repository Setup
- [ ] Cloned repository: `git clone https://github.com/yug1233/biasscan-ai.git`
- [ ] Changed to project directory: `cd biasscan-ai`
- [ ] Installed dependencies: `npm install`
- [ ] No installation errors

### 2. Supabase Configuration
- [ ] Created new Supabase project
- [ ] Noted project name and region
- [ ] Copied Project URL from Settings → API
- [ ] Copied anon/public key from Settings → API
- [ ] Opened SQL Editor in Supabase dashboard
- [ ] Copied contents from `supabase/schema.sql`
- [ ] Ran SQL successfully (no errors)
- [ ] Verified tables created: `users`, `scans`, `reviews`
- [ ] Verified RLS policies enabled

### 3. Environment Variables
- [ ] Created `.env` file: `cp .env.example .env`
- [ ] Added `VITE_SUPABASE_URL`
- [ ] Added `VITE_SUPABASE_ANON_KEY`
- [ ] Added `VITE_APP_URL=http://localhost:5173`
- [ ] (Optional) Added `VITE_STRIPE_PUBLIC_KEY`
- [ ] Saved `.env` file
- [ ] Verified `.env` is in `.gitignore`

### 4. Google OAuth (Optional)
- [ ] Went to Supabase → Authentication → Providers
- [ ] Enabled Google provider
- [ ] Created Google OAuth app in Google Console
- [ ] Added Client ID to Supabase
- [ ] Added Client Secret to Supabase
- [ ] Added authorized redirect URI: `https://[project-ref].supabase.co/auth/v1/callback`
- [ ] Saved Google OAuth settings

### 5. First Run
- [ ] Started dev server: `npm run dev`
- [ ] No console errors
- [ ] Opened http://localhost:5173
- [ ] Landing page loads correctly
- [ ] Dark/light mode toggle works
- [ ] Navigation works
- [ ] Mobile menu works (test on mobile or resize browser)

## 🧪 Testing Checklist

### Authentication Tests
- [ ] Clicked "Get Started"
- [ ] Signed up with email/password
- [ ] Received verification email (check spam)
- [ ] Verified email (if required)
- [ ] Signed in successfully
- [ ] Redirected to dashboard
- [ ] (Optional) Tested Google OAuth
- [ ] Signed out successfully
- [ ] Signed back in

### Upload & Analysis Tests
- [ ] Navigated to Upload page
- [ ] Drag & drop works
- [ ] Click to browse works
- [ ] Uploaded `public/sample-dataset.csv`
- [ ] File appears in upload area
- [ ] Clicked "Analyze for Bias"
- [ ] Progress bar shows
- [ ] Analysis completes
- [ ] Redirected to Results page

### Results Page Tests
- [ ] Overall risk displayed
- [ ] Detected biases shown
- [ ] Charts render correctly
- [ ] "Download PDF Report" works
- [ ] PDF downloads successfully
- [ ] PDF opens and looks correct
- [ ] "Share Results" copies link
- [ ] Can navigate back to dashboard

### Dashboard Tests
- [ ] Scan history shows uploaded file
- [ ] Statistics cards show correct numbers
- [ ] Can click on scan to view results
- [ ] Review form visible
- [ ] Can submit a review
- [ ] Review submission successful
- [ ] Recent reviews section shows reviews

### Admin Panel Tests (Optional)
- [ ] Changed email to `*@admin.biasscan.ai` in Supabase
- [ ] Navigated to `/admin`
- [ ] Can see pending reviews
- [ ] Can approve a review
- [ ] Can reject a review
- [ ] Review status updates

### UI/UX Tests
- [ ] Dark mode works
- [ ] Light mode works
- [ ] Theme persists on refresh
- [ ] Mobile responsive (test on phone or resize browser)
- [ ] All buttons clickable
- [ ] All links work
- [ ] No broken images
- [ ] Animations smooth
- [ ] Toast notifications appear

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing locally
- [ ] No console errors
- [ ] No console warnings (or acceptable)
- [ ] Build succeeds: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Preview works correctly

### Vercel Deployment
- [ ] Installed Vercel CLI: `npm i -g vercel`
- [ ] Logged in: `vercel login`
- [ ] Deployed: `vercel`
- [ ] Added environment variables in Vercel dashboard
- [ ] Deployed to production: `vercel --prod`
- [ ] Production URL works
- [ ] All features work in production

### Post-Deployment
- [ ] Updated `VITE_APP_URL` to production URL
- [ ] Redeployed with new URL
- [ ] Updated Google OAuth redirect URLs (if using)
- [ ] Tested authentication in production
- [ ] Tested file upload in production
- [ ] Tested all features in production
- [ ] Checked mobile responsiveness
- [ ] Verified SEO meta tags
- [ ] Tested PWA installation

## 📊 Optional Enhancements

### Stripe Integration
- [ ] Created Stripe account
- [ ] Got publishable key
- [ ] Added to environment variables
- [ ] Created products in Stripe
- [ ] Tested checkout flow

### Analytics
- [ ] Set up Google Analytics
- [ ] Added tracking code
- [ ] Verified tracking works
- [ ] Set up conversion goals

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Set up performance monitoring
- [ ] Configured alerts

### Custom Domain
- [ ] Purchased domain
- [ ] Added to Vercel/Netlify
- [ ] Configured DNS records
- [ ] SSL certificate active
- [ ] Domain works

## 🔍 Troubleshooting Checklist

### If Build Fails
- [ ] Cleared node_modules: `rm -rf node_modules`
- [ ] Cleared package-lock.json: `rm package-lock.json`
- [ ] Reinstalled: `npm install`
- [ ] Tried building again: `npm run build`

### If Supabase Connection Fails
- [ ] Verified `.env` file exists
- [ ] Checked environment variables are correct
- [ ] Verified Supabase project is not paused
- [ ] Checked Supabase project URL is correct
- [ ] Verified anon key is correct
- [ ] Restarted dev server

### If Authentication Fails
- [ ] Checked Supabase Auth is enabled
- [ ] Verified email provider is enabled
- [ ] Checked Google OAuth credentials (if using)
- [ ] Verified redirect URLs are correct
- [ ] Checked browser console for errors
- [ ] Tried incognito/private mode

### If Upload Fails
- [ ] Checked file size (<100MB)
- [ ] Verified file type (CSV or image)
- [ ] Checked browser console for errors
- [ ] Tried different file
- [ ] Cleared browser cache

## 📝 Documentation Checklist

- [ ] Read README.md
- [ ] Read QUICKSTART.md
- [ ] Reviewed DEPLOYMENT.md
- [ ] Checked docs/API.md
- [ ] Reviewed docs/ARCHITECTURE.md
- [ ] Read SECURITY.md
- [ ] Reviewed CONTRIBUTING.md

## ✨ Success Criteria

You've successfully set up BiasScan AI when:

- ✅ App runs locally without errors
- ✅ Can sign up and sign in
- ✅ Can upload and analyze files
- ✅ Can view results and download PDF
- ✅ Dashboard shows scan history
- ✅ Dark/light mode works
- ✅ Mobile responsive
- ✅ (Optional) Deployed to production
- ✅ (Optional) Custom domain working

## 🎉 Next Steps

After completing setup:

1. **Customize the App**
   - Update branding colors
   - Modify landing page content
   - Adjust bias detection thresholds

2. **Add Features**
   - Implement Stripe payments
   - Add more bias detection algorithms
   - Integrate TensorFlow.js for images

3. **Optimize**
   - Add more tests
   - Improve performance
   - Enhance SEO

4. **Launch**
   - Announce on social media
   - Submit to directories
   - Get user feedback

## 📞 Need Help?

If you're stuck on any step:

1. Check the relevant documentation
2. Search GitHub Issues
3. Ask in GitHub Discussions
4. Email support@biasscan.ai

## 🏆 Completion

- [ ] All critical items checked
- [ ] App working perfectly
- [ ] Ready for production
- [ ] Documentation reviewed
- [ ] Excited to use BiasScan AI! 🎊

---

**Congratulations on setting up BiasScan AI!** 🚀

You're now ready to detect bias in AI datasets and build fairer AI systems.
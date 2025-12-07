# 🎯 BiasScan AI

> **Production-ready no-code bias detection tool for AI datasets**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Upload CSV/images → Get bias-free data instantly. Privacy-first, client-side processing, GDPR compliant.

![BiasScan AI](https://img.shields.io/badge/Status-Production%20Ready-success)

## ✨ Features

### 🚀 Core Functionality
- **Instant Bias Detection**: Upload CSV/images and get results in seconds
- **Multi-Bias Analysis**: Detects gender, race, and age bias automatically
- **Privacy-First**: 100% client-side processing - your data never leaves your browser
- **PDF Reports**: Download comprehensive bias analysis reports
- **Cleaned Datasets**: Export resampled, bias-free datasets
- **Visual Analytics**: Interactive charts and graphs (Pie & Bar charts)

### 🎨 UI/UX
- **Stunning Design**: Professional blue-gradient theme with dark/light mode
- **Mobile Responsive**: Fully responsive across all devices
- **Smooth Animations**: Fade-in, slide-in effects for better UX
- **Drag & Drop**: Intuitive file upload with progress tracking
- **Toast Notifications**: Friendly error handling and success messages

### 🔐 Authentication & Security
- **Email/Password Auth**: Traditional authentication
- **Google OAuth**: One-click Google sign-in
- **Protected Routes**: Dashboard and upload pages require authentication
- **Row Level Security**: Supabase RLS policies for data protection
- **GDPR Compliant**: Zero data retention policy

### 💳 Pricing & Subscriptions
- **Free Tier**: 10 scans per month
- **Pro Plan**: $5/month for unlimited scans
- **Stripe Integration**: Ready for payment processing

### 📊 Dashboard Features
- **Scan History**: View all past bias detection scans
- **Usage Statistics**: Track high/medium/low risk scans
- **Review System**: Users can rate and review (1-5 stars)
- **Public Feed**: Approved reviews displayed publicly

### 👨‍💼 Admin Panel
- **Review Moderation**: Approve/reject user reviews
- **User Management**: View and manage users
- **Analytics**: Track platform usage

### 🌐 SEO & PWA
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- **PWA Support**: Installable as a mobile/desktop app
- **Offline Capable**: Service worker for offline functionality
- **Fast Loading**: Optimized bundle size and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React 18.2 + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Charts**: Chart.js + react-chartjs-2
- **PDF Generation**: jsPDF
- **File Processing**: PapaParse (CSV), Web Workers
- **Payments**: Stripe (ready to integrate)
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account
- Stripe account (optional, for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yug1233/biasscan-ai.git
cd biasscan-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

#### Run Database Schema
1. Go to Supabase SQL Editor
2. Copy contents from `supabase/schema.sql`
3. Run the SQL to create tables and policies

#### Enable Google OAuth (Optional)
1. Go to Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials

### 4. Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_APP_URL=http://localhost:5173
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app!

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

### Environment Variables for Production
Don't forget to add your environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_APP_URL`

## 📖 Usage Guide

### For Users

#### 1. Sign Up
- Visit the landing page
- Click "Get Started"
- Sign up with email or Google

#### 2. Upload Dataset
- Go to Upload page
- Drag & drop CSV or image file (max 100MB)
- Click "Analyze for Bias"

#### 3. View Results
- See overall risk assessment (High/Medium/Low)
- Review detected biases with recommendations
- Download PDF report
- Download cleaned dataset
- Share results with team

#### 4. Dashboard
- View scan history
- Track usage statistics
- Leave reviews and ratings

### For Admins

#### Access Admin Panel
- Sign in with admin email (`*@admin.biasscan.ai`)
- Navigate to `/admin`
- Moderate user reviews (approve/reject)

## 🔧 Configuration

### Bias Detection Thresholds
Edit `src/lib/biasDetection.js` to customize:
- Risk level thresholds (currently >75% = High, >60% = Medium)
- Bias categories to detect
- Resampling strategies

### Pricing Plans
Edit `src/pages/LandingPage.jsx` to update:
- Free tier limits
- Pro plan pricing
- Feature lists

### Theme Customization
Edit `tailwind.config.js` and `src/index.css` to customize:
- Color schemes
- Gradients
- Animations

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up with email
- [ ] Sign in with Google
- [ ] Upload CSV file
- [ ] Upload image file
- [ ] View results page
- [ ] Download PDF report
- [ ] Download cleaned dataset
- [ ] Leave a review
- [ ] Admin: Approve review
- [ ] Dark/light mode toggle
- [ ] Mobile responsiveness

### Sample CSV for Testing
Create a `test.csv` file:
```csv
name,gender,age,race
John,male,25,white
Jane,female,30,white
Bob,male,35,white
Alice,female,28,white
Charlie,male,40,asian
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Supabase](https://supabase.com/) for backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for icons

## 📧 Support

For support, email support@biasscan.ai or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Advanced ML models for image bias detection (TensorFlow.js)
- [ ] API access for Pro users
- [ ] Batch processing for multiple files
- [ ] Integration with popular ML platforms (HuggingFace, Kaggle)
- [ ] Custom bias detection rules
- [ ] Team collaboration features
- [ ] Webhook notifications
- [ ] Advanced analytics dashboard

## 📊 Project Structure

```
biasscan-ai/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Navbar.jsx
│   │   └── ThemeProvider.jsx
│   ├── lib/            # Utility functions
│   │   ├── supabase.js
│   │   ├── biasDetection.js
│   │   ├── pdfGenerator.js
│   │   └── utils.js
│   ├── pages/          # Page components
│   │   ├── LandingPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── UploadPage.jsx
│   │   ├── ResultsPage.jsx
│   │   └── AdminPage.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── supabase/
│   └── schema.sql      # Database schema
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

**Built with ❤️ for fair AI**

[Website](https://biasscan.ai) • [Documentation](https://docs.biasscan.ai) • [Twitter](https://twitter.com/biasscanai)
# Changelog

All notable changes to BiasScan AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-07

### Added
- 🎉 Initial release of BiasScan AI
- ✨ Client-side bias detection for CSV and image files
- 🔐 Email/password and Google OAuth authentication
- 📊 Interactive dashboard with scan history
- 📈 Visual analytics with Chart.js (Pie & Bar charts)
- 📄 PDF report generation with jsPDF
- 🎨 Beautiful dark/light mode UI with Tailwind CSS
- 📱 Fully responsive mobile design
- 🔒 Privacy-first architecture (zero data retention)
- ⭐ User review and rating system
- 👨‍💼 Admin panel for review moderation
- 💳 Stripe integration ready (payment processing)
- 🌐 SEO optimized with meta tags
- 📲 PWA support for mobile/desktop installation
- 🚀 Drag & drop file upload with progress tracking
- ⚡ Real-time bias detection algorithms
- 📦 Export cleaned datasets
- 🎯 Multi-bias detection (gender, race, age)
- 🔔 Toast notifications for user feedback
- 🛡️ Row Level Security with Supabase
- 📚 Comprehensive documentation
- 🧪 Sample datasets for testing

### Features

#### Core Functionality
- Instant bias detection for datasets up to 100MB
- Automatic detection of gender, race, and age bias
- Risk level assessment (High/Medium/Low)
- Actionable recommendations for bias mitigation
- Statistical analysis with distribution metrics

#### User Experience
- Smooth animations and transitions
- Intuitive navigation
- Error handling with friendly messages
- Loading states and progress indicators
- Share functionality for results

#### Security & Privacy
- GDPR compliant
- Client-side only processing
- No data transmission to servers
- Secure authentication with Supabase
- Row Level Security policies

#### Developer Experience
- Clean, modular code structure
- Comprehensive documentation
- Easy deployment to Vercel/Netlify
- Environment variable configuration
- ESLint for code quality

### Technical Stack
- React 18.2 with Vite
- Tailwind CSS + shadcn/ui
- Supabase (Auth + Database)
- Chart.js for visualizations
- jsPDF for report generation
- PapaParse for CSV processing
- React Router for navigation
- Lucide React for icons

### Documentation
- README.md with full setup instructions
- DEPLOYMENT.md for production deployment
- QUICKSTART.md for 5-minute setup
- CONTRIBUTING.md for contributors
- SECURITY.md for security policies
- Sample datasets for testing

## [Unreleased]

### Planned Features
- [ ] Advanced ML models for image bias detection
- [ ] API access for Pro users
- [ ] Batch processing for multiple files
- [ ] Integration with ML platforms (HuggingFace, Kaggle)
- [ ] Custom bias detection rules
- [ ] Team collaboration features
- [ ] Webhook notifications
- [ ] Advanced analytics dashboard
- [ ] Export to multiple formats (JSON, Excel)
- [ ] Scheduled scans
- [ ] Email reports
- [ ] Slack/Discord integrations

### Known Issues
- Image bias detection is placeholder (requires TensorFlow.js integration)
- Cleaned dataset export is simplified (needs advanced resampling)
- Admin panel requires manual email configuration

---

For more details, see the [GitHub releases](https://github.com/yug1233/biasscan-ai/releases).
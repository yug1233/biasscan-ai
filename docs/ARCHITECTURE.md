# Architecture Documentation

## System Overview

BiasScan AI is a client-side web application built with React that performs bias detection on datasets without transmitting data to external servers.

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    React App (Vite)                     │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │   Landing    │  │     Auth     │  │   Dashboard  │ │ │
│  │  │     Page     │  │     Page     │  │              │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │    Upload    │  │   Results    │  │    Admin     │ │ │
│  │  │     Page     │  │     Page     │  │     Page     │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │           Bias Detection Engine                  │  │ │
│  │  │  (Client-Side Processing - Web Workers)         │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │     Auth     │  │   Storage    │      │
│  │   Database   │  │   Service    │  │   (Future)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Frontend Layer

#### Pages
- **LandingPage**: Marketing page with features, pricing, testimonials
- **AuthPage**: Email/password and Google OAuth authentication
- **Dashboard**: User scan history, statistics, reviews
- **UploadPage**: File upload with drag-and-drop
- **ResultsPage**: Bias analysis results with charts
- **AdminPage**: Review moderation for admins

#### Components
- **Navbar**: Navigation with theme toggle
- **ThemeProvider**: Dark/light mode management
- **UI Components**: shadcn/ui components (Button, Card, Input, etc.)

### 2. Business Logic Layer

#### Bias Detection (`src/lib/biasDetection.js`)
```javascript
detectBias(file, fileType)
  ├─ detectCSVBias()
  │   ├─ Parse CSV with PapaParse
  │   ├─ Analyze gender distribution
  │   ├─ Analyze age distribution
  │   ├─ Analyze race/ethnicity distribution
  │   └─ Calculate risk levels
  └─ detectImageBias()
      └─ Placeholder for ML model integration
```

**Risk Calculation:**
- High Risk: >75% of any category
- Medium Risk: >60% of any category
- Low Risk: ≤60% of any category

#### PDF Generation (`src/lib/pdfGenerator.js`)
```javascript
generateBiasReport(biasMetrics, fileName)
  ├─ Create PDF document
  ├─ Add header with branding
  ├─ Add file information
  ├─ Add overall risk assessment
  ├─ Add detected biases
  ├─ Add recommendations
  ├─ Add privacy notice
  └─ Download PDF
```

### 3. Data Layer

#### Supabase Integration (`src/lib/supabase.js`)

**Authentication:**
- Email/password signup and signin
- Google OAuth integration
- Session management
- User profile creation

**Database Operations:**
- Create and retrieve scans
- Manage user reviews
- Update subscription plans
- Admin operations

#### Database Schema

```sql
users
├─ id (UUID, PK)
├─ email (TEXT)
├─ subscription_plan (TEXT)
├─ scan_count (INTEGER)
├─ created_at (TIMESTAMP)
└─ updated_at (TIMESTAMP)

scans
├─ id (UUID, PK)
├─ user_id (UUID, FK)
├─ file_name (TEXT)
├─ file_size (BIGINT)
├─ file_type (TEXT)
├─ bias_metrics (JSONB)
├─ overall_risk (TEXT)
└─ created_at (TIMESTAMP)

reviews
├─ id (UUID, PK)
├─ user_id (UUID, FK)
├─ rating (INTEGER)
├─ comment (TEXT)
├─ status (TEXT)
├─ created_at (TIMESTAMP)
└─ updated_at (TIMESTAMP)
```

## Data Flow

### Upload and Analysis Flow

```
1. User uploads file
   ↓
2. File validation (size, type)
   ↓
3. Client-side processing begins
   ↓
4. Parse file (CSV: PapaParse, Image: FileReader)
   ↓
5. Run bias detection algorithms
   ↓
6. Calculate risk levels
   ↓
7. Generate recommendations
   ↓
8. Save metadata to Supabase
   ↓
9. Display results
   ↓
10. Generate PDF report
```

### Authentication Flow

```
1. User clicks "Sign In/Up"
   ↓
2. Choose method (Email or Google)
   ↓
3. Supabase Auth handles authentication
   ↓
4. On success, create user profile
   ↓
5. Redirect to dashboard
   ↓
6. Load user data
```

## Security Architecture

### Client-Side Security
- All file processing in browser
- No data transmission to servers
- Files deleted from memory after processing
- XSS protection via React
- CSRF protection via Supabase

### Server-Side Security
- Row Level Security (RLS) policies
- User can only access own data
- Admin role for review moderation
- Secure session management
- HTTPS only

### Privacy Measures
- Zero data retention policy
- GDPR compliant
- No file storage
- Minimal metadata collection
- Transparent privacy policy

## Performance Optimization

### Bundle Optimization
- Code splitting with React.lazy
- Tree shaking with Vite
- Minification in production
- Gzip compression

### Runtime Optimization
- Web Workers for heavy processing
- Lazy loading of components
- Memoization of expensive calculations
- Debounced search/filter operations

### Caching Strategy
- Service Worker for offline support
- LocalStorage for theme preference
- Session storage for temporary data
- Browser cache for static assets

## Scalability Considerations

### Current Limitations
- File size: 100MB max
- Processing: Client-side only
- Concurrent users: Limited by Supabase free tier

### Future Scaling Options
1. **Backend Processing**
   - Add server-side processing for large files
   - Queue system for batch processing
   - Distributed processing with workers

2. **Database Scaling**
   - Upgrade Supabase plan
   - Add read replicas
   - Implement caching layer (Redis)

3. **CDN Integration**
   - Serve static assets via CDN
   - Edge caching for API responses
   - Geographic distribution

## Technology Stack

### Frontend
- **React 18.2**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: Component library
- **React Router**: Client-side routing
- **Chart.js**: Data visualization

### Backend
- **Supabase**: Backend-as-a-Service
  - PostgreSQL database
  - Authentication service
  - Row Level Security
  - Real-time subscriptions

### Libraries
- **PapaParse**: CSV parsing
- **jsPDF**: PDF generation
- **Lucide React**: Icons
- **React Dropzone**: File upload
- **Stripe**: Payment processing (ready)

## Deployment Architecture

```
GitHub Repository
      ↓
GitHub Actions (CI/CD)
      ↓
Build & Test
      ↓
Deploy to Vercel/Netlify
      ↓
CDN Distribution
      ↓
End Users
```

### Environment Variables
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key
- `VITE_APP_URL`: Application URL

## Monitoring & Logging

### Client-Side
- Error boundaries for React errors
- Console logging in development
- Sentry integration (optional)

### Server-Side
- Supabase logs for database operations
- Auth logs for authentication events
- API logs for request tracking

## Future Enhancements

### Planned Features
1. **Advanced ML Integration**
   - TensorFlow.js for image analysis
   - Custom bias detection models
   - Real-time model updates

2. **API Development**
   - RESTful API for Pro users
   - Webhook support
   - Batch processing endpoints

3. **Team Features**
   - Multi-user workspaces
   - Shared scans
   - Role-based access control

4. **Analytics**
   - Usage tracking
   - Bias trend analysis
   - Custom reporting

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for architecture guidelines and best practices.

## Questions?

For architecture questions, email: architecture@biasscan.ai
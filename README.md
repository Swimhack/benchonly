# BenchOnly.com - Bench Press Training Platform

A premium fitness platform dedicated exclusively to bench press training, featuring expert programs, progress tracking, and community features.

## 🏋️ Features

- **Expert Training Programs**: 8, 16, and 24-week bench press programs
- **Progress Tracking**: Log workouts, track PRs, and monitor improvements
- **User Profiles**: Customize training schedules and goals
- **Subscription Management**: Stripe-powered premium memberships
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: Secure login with email/password and Google OAuth

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Icons**: Lucide React
- **State Management**: Zustand
- **Routing**: React Router DOM

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Stripe account (for payments)
- Domain name (for production)

## 🛠️ Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo>
   cd benchonly
   npm install
   ```

2. **Environment setup**:
   Create `.env` file with:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database setup**:
   - Run the migration in `supabase/migrations/` in your Supabase SQL editor
   - Configure authentication providers in Supabase dashboard

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🚢 Digital Ocean Deployment

### Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build (optional)
npm run preview
```

### Deployment Steps

1. **App Platform Setup**:
   ```yaml
   # .do/app.yaml
   name: benchonly
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/benchonly
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     routes:
     - path: /
     envs:
     - key: VITE_SUPABASE_URL
       value: your_supabase_url
     - key: VITE_SUPABASE_ANON_KEY
       value: your_supabase_anon_key
   ```

2. **Static Site Deployment** (Alternative):
   ```bash
   # Build the app
   npm run build
   
   # Upload dist/ folder to Digital Ocean Spaces
   # Configure CDN and custom domain
   ```

3. **Environment Variables**:
   Set in Digital Ocean App Platform:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Domain Configuration**:
   - Point your domain to Digital Ocean App Platform
   - Configure SSL certificate
   - Update Supabase auth settings with new domain

### Production Considerations

- **Supabase Configuration**:
  - Update Site URL in Authentication settings
  - Add production domain to redirect URLs
  - Configure email templates

- **Stripe Configuration**:
  - Update webhook endpoints
  - Set production API keys
  - Configure product pricing

- **Performance**:
  - Enable gzip compression
  - Configure CDN for static assets
  - Set up monitoring and analytics

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   └── SubscriptionModal.tsx
├── pages/              # Route components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Programs.tsx
│   ├── Profile.tsx
│   ├── Login.tsx
│   └── AuthCallback.tsx
├── store/              # State management
│   └── authStore.ts
├── lib/                # Utilities and configurations
│   ├── supabase.ts
│   └── stripe.ts
├── types/              # TypeScript definitions
│   └── index.ts
└── assets/             # Static assets
    └── images/
```

## 🗄️ Database Schema

### Tables

- **profiles**: User profile information
- **programs**: Training programs
- **training_logs**: Workout history
- **subscriptions**: Payment and subscription data

### Key Relationships

- Users have one profile
- Users can have multiple training logs
- Users have one subscription
- Programs are accessible based on subscription status

## 🔐 Authentication Flow

1. User signs up/in via email or Google OAuth
2. Profile automatically created via database trigger
3. User redirected to dashboard
4. Subscription status determines feature access

## 💳 Payment Integration

- Stripe Checkout for subscriptions
- Webhook handling for subscription updates
- Automatic access control based on payment status

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 📈 Monitoring & Analytics

Consider integrating:
- Google Analytics
- Sentry for error tracking
- Supabase Analytics
- Stripe Dashboard for payment metrics

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+)
   - Verify environment variables
   - Clear node_modules and reinstall

2. **Authentication Issues**:
   - Verify Supabase URL and keys
   - Check redirect URLs in Supabase dashboard
   - Ensure HTTPS in production

3. **Payment Issues**:
   - Verify Stripe keys and webhook endpoints
   - Check webhook signing secrets
   - Monitor Stripe dashboard for errors

## 📞 Support

For technical support or questions:
- Email: support@benchonly.com
- Documentation: [Supabase Docs](https://supabase.com/docs)
- Stripe: [Stripe Docs](https://stripe.com/docs)

## 📄 License

Private - All rights reserved
# Stride Platform

> Create beautiful, interactive onboarding tours for any website

Stride is a comprehensive web-based platform that enables website owners to create, manage, and deploy interactive guided tours for seamless user onboarding experiences.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

##  Project Structure

```
strideplatform/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── about/                      # About page
│   ├── docs/                       # Documentation
│   ├── login/                      # Authentication
│   ├── signup/                     # User registration
│   └── dashboard/                  # Dashboard (authenticated)
│       ├── page.tsx                # Tours list
│       ├── tours/                  # Tour management
│       ├── analytics/              # Analytics dashboard
│       └── settings/               # User settings
│
├── components/
│   ├── marketing/                  # Public-facing components
│   └── dashboard/                  # Dashboard components
│
└── lib/
    ├── auth.ts                     # Authentication utilities
    └── api.ts                      # API client
```

##  Core Features

### For Platform Users
- **Tour Creator**: Drag-and-drop interface for building multi-step tours
- **Visual Editor**: Rich text editing with CSS selector targeting
- **Analytics Dashboard**: Real-time metrics and completion rates
- **Embed Code Generator**: One-click deployment to any website

### For End Users (StrideCore Widget)
- **Smart Positioning**: Auto-adjusting tooltips with collision detection
- **Interactive Navigation**: Keyboard, touch, and click support
- **Progress Tracking**: Resume tours across sessions
- **Responsive Design**: Works on all screen sizes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion (planned)

##  Development Workflow

### Dev A - Marketing & Public Pages
- Landing page with animations
- About, Docs, Login, Signup pages
- Marketing components (Hero, Features, Demo)

### Dev B - Dashboard & Core Features
- Dashboard layout and navigation
- Tour creation and editing interface
- Analytics and settings pages
- Dashboard components

##  Development Guidelines

1. **Component Organization**: Keep marketing and dashboard components separate
2. **Shared Utilities**: Place reusable code in `/lib`
3. **Type Safety**: Use TypeScript for all new code
4. **Styling**: Use Tailwind CSS utility classes
5. **Minimal Code**: Write only what's necessary

##  Related Projects

- **StrideCore**: Embeddable widget repository (separate project)

##  License

MIT


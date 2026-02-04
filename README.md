# Giftshopsmart - E-commerce PWA

A full-stack E-commerce Progressive Web Application built with React, Vite, Tailwind CSS, Supabase, and Firebase.

## 🚀 Features
- **Customer & Admin Roles** (Managed via Supabase & Firebase)
- **Product Management** (Listings, Categories, Variations)
- **Shopping Cart & Checkout** (Razorpay integration ready)
- **Order Tracking** (Status updates)
- **PWA Support** (Installable on mobile/desktop)
- **Responsive Design** (Mobile-first, Beautiful UI)

## 🛠 Tech Stack
- **Frontend**: React.js, Vite, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Storage, RLS)
- **Auth**: Firebase Authentication (Google, Email/Password)
- **Payments**: Razorpay (Stubbed integration)
- **Icons**: Lucide React

## 📂 Project Structure
```
src/
├── components/   # Reusable UI components (Navbar, Footer, ProtectedRoute)
├── context/      # Global state (Auth, Cart)
├── layouts/      # Page layouts
├── lib/          # Service clients (Firebase, Supabase)
├── pages/        # Application pages (Home, Shop, Product, Admin, etc.)
├── types/        # TypeScript definitions
└── App.tsx       # Routing and App entry
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your keys (see `SETUP_GUIDE.md` for details):
```env
VITE_FIREBASE_API_KEY=...
VITE_SUPABASE_URL=...
VITE_RAZORPAY_KEY_ID=...
```

### 3. Database Setup
Run the SQL queries in `supabase_schema.sql` in your Supabase SQL Editor to set up tables and policies.

### 4. Run Locally
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 📱 PWA Configuration
The app is configured as a PWA. To enable it fully:
1. Ensure `public/` contains valid icon files (`pwa-192x192.png`, etc.).
2. Uncomment/Configure the `VitePWA` plugin in `vite.config.ts` if needed.

## 🚢 Deployment
- **Vercel**: Connect your GitHub repo and deploy. Ensure Environment Variables are set in Vercel Dashboard.
- **Netlify**: Drag and drop the `dist` folder or connect via Git.

## 📄 License
MIT

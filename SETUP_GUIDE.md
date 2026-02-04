# Firebase Authentication Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project "Giftshopsmart".
3. Navigate to **Build > Authentication**.
4. Click **Get Started**.
5. Enable **Email/Password** provider.
6. Enable **Google** provider.
7. Go to **Project Settings > General**.
8. Scroll to **Your apps**, click the Web icon (</>).
9. Register the app (e.g., "Giftshopsmart Web").
10. Copy the `firebaseConfig` object.
11. Create a file `.env` in the project root and add the values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

# Supabase Setup

1. Go to [Supabase](https://supabase.com/).
2. Create a new project.
3. Keep the API keys secure.
4. Go to **SQL Editor** and run the contents of `supabase_schema.sql`.
5. Add keys to `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

# Razorpay Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Get your Test Key ID and Key Secret.
3. Add to `.env`:

```env
VITE_RAZORPAY_KEY_ID=your_key_id
```

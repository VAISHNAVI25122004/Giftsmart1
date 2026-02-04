-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Sync with Auth or standalone profile)
-- Note: Supabase handles auth.users. This is a public profiles table if needed, 
-- or we can use the auth.users directly via referencing, but usually a 'profiles' or 'users' table in public schema is good.
-- We'll call it 'profiles' as is standard, but the prompt asked for 'users'.
create table public.users (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'customer' check (role in ('admin', 'customer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CATEGORIES
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric not null,
  discount_price numeric,
  category_id uuid references public.categories(id),
  stock_quantity integer default 0,
  images text[], -- Array of image URLs
  rating numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCT VARIANTS
create table public.product_variants (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  color text,
  size text,
  additional_price numeric default 0,
  stock_quantity integer default 0
);

-- ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  total_amount numeric not null,
  status text default 'placed' check (status in ('placed', 'packed', 'shipped', 'delivered', 'cancelled')),
  payment_id text, -- Razorpay Payment ID
  payment_status text default 'pending',
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id),
  variant_id uuid references public.product_variants(id),
  quantity integer default 1,
  price_at_purchase numeric not null
);

-- REVIEWS
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  user_id uuid references public.users(id) not null,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  approved boolean default false, -- For moderation
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DELIVERY TRACKING (Detailed logs)
create table public.delivery_tracking (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  status text not null,
  location text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE RLS
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;

-- POLICIES
-- Users can view their own profile
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

-- Everyone can view products
create policy "Public products access" on public.products for select using (true);

-- Admins can do everything (Check user role in application or via specific admin claim/table lookup)
-- Simplified RLS for demo: assume a function or claim 'is_admin' exists, or just manual check in app for now, 
-- but for Production RLS, we'd check the users table role.
-- Example: 
-- create policy "Admin full access products" on public.products for all using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

-- Customers can view their own orders
create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users create orders" on public.orders for insert with check (auth.uid() = user_id);

-- Storage buckets setup (conceptual)
-- insert into storage.buckets (id, name) values ('products', 'products');

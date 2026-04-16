# Tradition eCommerce (Production-Ready Full Stack)

Production-ready eCommerce web app with:
- **Frontend:** React + Vite, Tailwind CSS, React Router, Axios, Redux Toolkit
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, MVC architecture
- **Media:** Cloudinary uploads for images and videos
- **Payments:** Stripe payment intent flow + provider support (`stripe`, `razorpay`, `cod`)

---

## Features

### Customer
- JWT auth (register, login, profile)
- Product listing with:
  - category filter
  - search
  - pagination
  - sorting
- Product details:
  - image gallery
  - optional promo video
- Wishlist
- Cart management
- Checkout + order placement
- My orders page

### Home page (Myntra + Anokhi hybrid flow)
- Navbar with logo, category dropdown, search, account/wishlist/cart icons
- Hero section with full-width video + overlay CTA
- Category grid (Shawls, Kurtas, Jewellery, Bags, Home Decor, Masale)
- New Arrivals horizontal cards
- Ethnic Collection section
- Accessories section
- Handmade Picks section
- Reusable PromoBanner section
- Optional brand story video section
- Footer with links + newsletter UI

### Admin panel
- Dashboard stats
- Product CRUD (image/video URL support)
- Category manager (pre-seeded, editable)
- Promo video manager (active/inactive toggle)
- Order management (status updates)

---

## Pre-seeded Categories

Seeded in backend and filterable:

- Winter Shawls
- Bedsheets
- Kurta Pajama Women
- Kurta Pajama Men
- Jewellery Artificial
- Jhumka Earrings (Oxidized Silver)
- Ethnic Necklace Set
- Handmade Bracelet
- Scarf / Silk Scarf
- Fabric Hair Scrunchies
- Accessories
- Home Decor
- Masale (Spices)
- Diary
- Gift Pouch Bag
- Fabric Tote Bag (Block Print)
- Ethnic Sling Bag

---

## Repository Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    seed/
    utils/
frontend/
  src/
    app/
    components/
    hooks/
    pages/
    services/
    store/
    utils/
```

---

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Set environment values in `backend/.env`:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `AUTH_DISABLED` (`true` to bypass JWT in development)
- `DEV_AUTH_USER_EMAIL` (user attached when auth is disabled; default admin)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_SECRET_KEY`

Run backend:

```bash
npm run dev
```

Seed database (categories, sample products, admin/customer users):

```bash
npm run seed
```

Seed default users:
- Admin: `admin@tradition.com` / `admin123`
- Customer: `customer@tradition.com` / `customer123`

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_AUTH_DISABLED=false
```

Run frontend:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

---

## API Highlights

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/me`

### Catalog
- `GET /api/products` (search/filter/pagination/sort)
- `GET /api/products/collections/home`
- `GET /api/products/:id`

### Cart & Wishlist
- `GET/POST/PATCH/DELETE /api/cart`
- `GET/POST/DELETE /api/wishlist`

### Orders & Payments
- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders` (admin)
- `PATCH /api/orders/:id/status` (admin)
- `POST /api/payments/stripe/create-intent`
- `POST /api/payments/stripe/confirm`

### Admin/Media
- `GET /api/admin/dashboard`
- Product/category/promo CRUD routes
- Cloudinary upload routes for images/videos

---

## Admin Login and Admin API Usage

### Option A: Normal JWT mode (default)

Use:
- `AUTH_DISABLED=false` in `backend/.env`
- `VITE_AUTH_DISABLED=false` in `frontend/.env`

1. Seed once:
   ```bash
   cd backend
   npm run seed
   ```
2. Login from UI with admin credentials:
   - email: `admin@tradition.com`
   - password: `admin123`
3. Use returned token in API calls:
   ```bash
   curl -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:5000/api/admin/dashboard
   ```

### Option B: Disable token mechanism (for local dev)

Use:
- `AUTH_DISABLED=true` in `backend/.env`
- `DEV_AUTH_USER_EMAIL=admin@tradition.com` in `backend/.env`
- `VITE_AUTH_DISABLED=true` in `frontend/.env`

Behavior:
- JWT checks are bypassed in middleware (code is still present, not removed)
- Protected APIs automatically act as `DEV_AUTH_USER_EMAIL`
- Frontend protected routes load as authenticated once profile is fetched

Example admin API call without token:
```bash
curl http://localhost:5000/api/admin/dashboard
```

You can switch impersonated user in disabled-auth mode by header:
```bash
curl -H "x-dev-user-email: customer@tradition.com" http://localhost:5000/api/auth/me
```

---

## Notes

- Backend follows MVC pattern and protected route middleware.
- Passwords are hashed with bcrypt.
- Request validation uses `express-validator`.
- JWT-based authorization for customer/admin access control.

# Codivra - Auth Setup Guide

## Project Structure

```
/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js/Express API
├── config/            # Environment configs
├── server/            # Additional server files
└── supabase/          # Database migrations
```

## Backend Login & Signup Implementation

### What's Configured:

✅ **Admin Login** - POST `/api/admin/login`
✅ **Admin Signup** - POST `/api/admin/signup`
✅ **Protected Routes** - GET `/api/admin/me` (requires JWT token)
✅ **JWT Authentication** - Token-based authentication
✅ **Bcrypt Hashing** - Secure password hashing
✅ **MongoDB Integration** - Persistent admin storage

### API Endpoints

#### Login

```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@codivra.local",
  "password": "Admin@123456"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "admin@codivra.local",
    "name": "Admin",
    "role": "admin"
  },
  "message": "Login successful"
}
```

#### Signup

```
POST /api/admin/signup
Content-Type: application/json

{
  "email": "newadmin@codivra.local",
  "password": "SecurePass123",
  "name": "New Admin"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "newadmin@codivra.local",
    "name": "New Admin",
    "role": "admin"
  },
  "message": "Admin account created successfully"
}
```

#### Get Admin Profile (Protected)

```
GET /api/admin/me
Authorization: Bearer <token>

Response:
{
  "user": {
    "email": "admin@codivra.local",
    "role": "admin",
    "name": "Admin"
  }
}
```

## Setup Instructions

### 1. MongoDB Setup

Make sure MongoDB is running locally:

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or run Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Backend Environment

Copy the environment file to backend:

```bash
cp config/.env.backend backend/.env
```

Edit `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/codivra
MONGODB_DB_NAME=codivra
JWT_SECRET=your-super-secret-key-change-this-in-production
ADMIN_EMAIL=admin@codivra.local
ADMIN_PASSWORD=Admin@123456
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### 3. Frontend Environment

Edit `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:4000
```

### 4. Install & Run

**Backend:**

```bash
cd backend
npm install
npm run dev    # Runs on port 4000
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev    # Runs on port 5173
```

### 5. Default Admin Account

The system will automatically create a default admin account:

- **Email**: `admin@codivra.local`
- **Password**: `Admin@123456`

Or change these in `.env` before starting the server.

## How Frontend Auth Works

1. **Login Flow**:

   - User submits email/password at `/admin/login`
   - Frontend calls `POST /api/admin/login`
   - Response includes JWT token
   - Token stored in `localStorage` as `admin_token`
   - Redirects to `/admin` dashboard

2. **Protected Routes**:

   - `RequireAdmin` component checks for token
   - All API requests include `Authorization: Bearer <token>` header
   - Backend validates token with `requireAdmin` middleware
   - Invalid/expired token returns 401 Unauthorized

3. **Token Management**:
   - Stored in `localStorage`
   - Automatically sent with every request via Redux API
   - Expires based on JWT_EXPIRES_IN (default: 7 days)

## Accessing Admin Panel

1. Start both servers (see step 4 above)
2. Go to `http://localhost:5173/admin/login`
3. Login with:
   - Email: `admin@codivra.local`
   - Password: `Admin@123456` (or your custom password)
4. You'll be redirected to the admin dashboard `/admin`

## Database Collections

The system uses these MongoDB collections:

```
codivra/
├── admins              # Admin users with hashed passwords
├── job_applications    # Career applications (managed via admin)
├── contacts            # Contact form submissions
└── pages               # Page content/sections
```

## Security Features

✅ Passwords hashed with bcrypt (salt rounds: 10)
✅ JWT tokens signed with secret key
✅ Token expiration (7 days default)
✅ CORS protection configured
✅ Protected admin routes require valid token
✅ Input validation with Zod schemas
✅ Environment variables for sensitive config

## Common Issues & Fixes

### "MongoDB connection failed"

- Ensure MongoDB is running
- Check MONGODB_URI in .env

### "Cannot find admin_token"

- Clear localStorage: `localStorage.clear()` in console
- Try logging in again

### CORS errors

- Ensure frontend URL is in CORS_ORIGIN
- Example: `CORS_ORIGIN=http://localhost:5173`

### JWT verification failed

- JWT_SECRET must match on backend
- Check token hasn't expired
- Clear token and re-login

---

**Everything is now configured and ready to use! 🚀**

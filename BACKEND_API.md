# Backend Authentication API - Complete Guide

## ✅ Server Status

- Backend is running on `http://localhost:4000`
- MongoDB auto-seeding is configured
- JWT authentication is fully set up
- All routes are protected with middleware

## API Endpoints

### 1. **Admin Signup**

Create a new admin account

```bash
curl -X POST http://localhost:4000/api/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newadmin@codivra.local",
    "password": "SecurePass123",
    "name": "New Admin"
  }'
```

**Requirements:**

- Email: Valid email format
- Password: Min 6 chars, 1 uppercase letter, 1 number
- Name: 2-100 characters

**Success Response (201):**

```json
{
  "success": true,
  "message": "Admin account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "newadmin@codivra.local",
    "name": "New Admin",
    "role": "admin"
  }
}
```

---

### 2. **Admin Login**

Login with existing admin account

```bash
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@codivra.local",
    "password": "Admin@123456"
  }'
```

**Default Credentials (auto-created):**

- Email: `admin@codivra.local`
- Password: `Admin@123456`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@codivra.local",
    "name": "Admin",
    "role": "admin"
  }
}
```

**Error Responses:**

```json
// Invalid credentials (401)
{
  "success": false,
  "error": "Invalid credentials"
}

// Invalid input (400)
{
  "success": false,
  "error": "Invalid input",
  "issues": { ... }
}
```

---

### 3. **Get Admin Profile**

Get current logged-in admin info (Protected)

```bash
curl -X GET http://localhost:4000/api/admin/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Success Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@codivra.local",
    "role": "admin",
    "name": "Admin",
    "last_login": "2025-12-19T13:45:23.000Z"
  }
}
```

**Error Response:**

```json
// Missing/Invalid token (401)
{
  "success": false,
  "error": "Unauthorized - Missing token"
}
```

---

### 4. **Change Password**

Update admin password (Protected)

```bash
curl -X POST http://localhost:4000/api/admin/change-password \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "Admin@123456",
    "newPassword": "NewPass123"
  }'
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**

```json
// Old password incorrect (401)
{
  "success": false,
  "error": "Old password is incorrect"
}

// New password too short (400)
{
  "success": false,
  "error": "New password must be at least 6 characters"
}
```

---

### 5. **Get Job Applications**

List all job applications (Protected)

```bash
curl -X GET http://localhost:4000/api/admin/job-applications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Success Response (200):**

```json
{
  "success": true,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "job_title": "React Developer",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "linkedin_url": "https://linkedin.com/in/johndoe",
      "portfolio_url": "https://johndoe.com",
      "cover_letter": "I'm interested in...",
      "created_at": "2025-12-19T10:30:00Z"
    }
  ]
}
```

---

### 6. **Delete Job Application**

Delete a specific job application (Protected)

```bash
curl -X DELETE http://localhost:4000/api/admin/job-applications/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Success Response (200):**

```json
{
  "success": true,
  "status": "ok"
}
```

---

## Database Schema

### `admins` Collection

```javascript
{
  _id: ObjectId,
  email: String,              // Unique
  name: String,
  passwordHash: String,       // Bcrypt hashed
  is_active: Boolean,
  created_at: ISODate,
  updated_at: ISODate,
  last_login: ISODate | null
}
```

### `job_applications` Collection

```javascript
{
  _id: ObjectId,
  job_title: String,
  name: String,
  email: String,
  phone: String | null,
  linkedin_url: String | null,
  portfolio_url: String | null,
  cover_letter: String | null,
  created_at: ISODate
}
```

---

## Authentication Flow

### 1. **Signup Process**

```
User submits form
    ↓
Frontend validates email/password
    ↓
POST /api/admin/signup
    ↓
Backend validates input (Zod schema)
    ↓
Check if email already exists
    ↓
Hash password (bcrypt, 10 rounds)
    ↓
Insert into MongoDB
    ↓
Generate JWT token (7 day expiration)
    ↓
Return token + user info
    ↓
Frontend stores token in localStorage
    ↓
Redirect to admin dashboard
```

### 2. **Login Process**

```
User submits credentials
    ↓
Frontend validates
    ↓
POST /api/admin/login
    ↓
Backend validates input
    ↓
Find admin by email in MongoDB
    ↓
Compare password with bcrypt hash
    ↓
Update last_login timestamp
    ↓
Generate JWT token
    ↓
Return token + user info
    ↓
Frontend stores token in localStorage
    ↓
Redirect to admin dashboard
```

### 3. **Protected Route Access**

```
User requests protected resource
    ↓
Frontend includes Authorization header: Bearer <token>
    ↓
Backend requireAdmin middleware intercepts
    ↓
Extract token from Authorization header
    ↓
Verify JWT signature and expiration
    ↓
If valid: attach payload to req.admin and call next()
    ↓
If invalid: return 401 Unauthorized
```

---

## Token Structure

The JWT token contains:

```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "admin@codivra.local",
  "role": "admin",
  "name": "Admin",
  "iat": 1703084400,
  "exp": 1703689200
}
```

---

## Security Features

✅ **Passwords:** Hashed with bcrypt (salt rounds: 10)
✅ **JWT:** Signed with secret key, 7-day expiration
✅ **Validation:** Input validation with Zod schemas
✅ **Password Requirements:**

- Min 6 characters
- Min 1 uppercase letter
- Min 1 number
  ✅ **Rate Limiting:** Can be added if needed
  ✅ **CORS:** Configured for frontend origins
  ✅ **Status Tracking:** Admin can be marked inactive

---

## Testing with Postman/Insomnia

### 1. Create Signup Request

```
POST http://localhost:4000/api/admin/signup
Headers: Content-Type: application/json
Body (JSON):
{
  "email": "test@codivra.local",
  "password": "TestPass123",
  "name": "Test Admin"
}
```

### 2. Save Token

Copy the `token` from the response and save it for later requests.

### 3. Create Authenticated Request

```
GET http://localhost:4000/api/admin/me
Headers:
  - Authorization: Bearer <PASTE_TOKEN_HERE>
  - Content-Type: application/json
```

---

## Common Issues & Solutions

### ❌ "Invalid credentials"

- Check email matches exactly (case-insensitive)
- Verify password requirements (uppercase + number)
- For default admin, use: `admin@codivra.local` / `Admin@123456`

### ❌ "Token expired"

- User must login again
- Frontend should clear localStorage and redirect to login

### ❌ "Missing token"

- Ensure Authorization header is present
- Format: `Authorization: Bearer <token>`

### ❌ "MongoDB connection failed"

- Ensure MongoDB is running: `brew services start mongodb-community`
- Check MONGODB_URI in `.env`

### ⚠️ "SMTP transporter not verified"

- This is just a warning, authentication still works
- Configure proper email credentials in `.env` to fix

---

## Frontend Integration

The frontend automatically:

1. Stores token in `localStorage` as `admin_token`
2. Sends token with every API request
3. Redirects to login if token is missing/invalid
4. Shows success/error toasts

See `/frontend/src/lib/api.ts` for API configuration.

---

## Running the Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev    # Runs on port 4000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev    # Runs on port 5173
```

**MongoDB (if not running):**

```bash
brew services start mongodb-community
# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

**✨ Everything is configured and ready to use!**

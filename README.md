# Codivra Website & Admin Panel

## Overview

Codivra is a modern, full-stack web application designed to showcase a business or agency's services, portfolio, team, blog, and more. The project is divided into two main parts:

- **Website (Frontend)**: The public-facing site for visitors and potential clients.
- **Admin Panel (Backend)**: A secure dashboard for administrators to manage website content and data.

---

## Website (Frontend)

- **Tech Stack**: React (with Vite), TypeScript, Tailwind CSS
- **Location**: `frontend/`
- **Features**:
  - Home, About, Services, Portfolio, Blog, Careers, Contact pages
  - Responsive design for all devices
  - Animated transitions and sections for a modern look
  - Team and testimonials sections
  - Contact form with email integration
  - Blog section for news and updates
  - Careers page for job listings
  - SEO-friendly structure
- **Folder Structure**:
  - `src/components/` – Reusable UI components
  - `src/pages/` – Main website pages
  - `src/hooks/` – Custom React hooks
  - `src/lib/` – API utilities and store
  - `src/config/` – Route and config files
  - `public/` – Static assets
- **How to Run**:
  1.  Navigate to `frontend/`
  2.  Install dependencies: `npm install`
  3.  Start the dev server: `npm run dev`
  4.  Visit `http://localhost:5173` in your browser

---

## Admin Panel (Backend)

- **Tech Stack**: Node.js, Express (ESM), MongoDB
- **Location**: `backend/`
- **Features**:
  - Secure login for admins
  - Manage website content: blogs, services, portfolio, team, careers, subscriptions, etc.
  - File uploads (e.g., images via Cloudinary)
  - Email notifications and contact management
  - RESTful API endpoints for frontend integration
  - Data validation and authentication middleware
- **Folder Structure**:
  - `src/controllers/` – Business logic for each resource
  - `src/routes/` – API route definitions
  - `src/db/` – Database connection setup
  - `src/middleware/` – Auth, upload, and other middleware
  - `src/validation/` – Joi schemas for data validation
  - `src/services/` – Email and other services
  - `src/config/` – Environment and third-party configs
- **How to Run**:
  1.  Navigate to `backend/`
  2.  Install dependencies: `npm install`
  3.  Set up environment variables in `.env` (see `src/config/env.mjs` for required keys)
  4.  Start the server: `npm start` or `node src/server.mjs`
  5.  API runs at `http://localhost:5000` (default)

---

## How It Works

- The **frontend** fetches and displays data from the backend via REST APIs.
- The **admin panel** allows authorized users to add, edit, or delete content, which is instantly reflected on the website.
- All sensitive operations are protected by authentication and validation.

---

## Contribution & Customization

- Fork or clone the repository.
- Update content, styles, or add new features as needed.
- For deployment, configure environment variables and use production build commands.

---

## Deployment on Render.com

This project is configured for deployment on [Render.com](https://render.com) using a single repository for both frontend and backend.

### Steps to Deploy

1. **Push your code to GitHub/GitLab/Bitbucket.**
2. **Create a new Blueprint (YAML) deploy on Render:**
   - Go to the Render dashboard.
   - Click "New +" → "Blueprint".
   - Connect your repository.
   - Render will detect the `render.yaml` at the root and set up both services (frontend and backend).
3. **Set Environment Variables:**
   - For each service, add required environment variables in the Render dashboard under the service's settings.
   - Example: `MONGODB_URI`, `JWT_SECRET`, etc. for backend.
4. **Deploy!**
   - Click "Apply" to deploy both services.

### File: `render.yaml`

- Defines two services:
  - `codivra-backend`: Node.js backend (runs from `backend/`)
  - `codivra-frontend`: Static frontend (builds from `frontend/`)

### Notes

- Update the `buildCommand`, `startCommand`, and `envVars` in `render.yaml` as needed for your project.
- For custom domains, SSL, or scaling, see Render's documentation.

---

## Contact

For questions or support, please contact the project maintainer.

---

**Enjoy building with Codivra!**

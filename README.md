# Anonymous Messaging Web Application (WhisperBox)

Production-ready MVP for receiving anonymous messages through a public profile link.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT + bcrypt

## Features

- Signup/Login with email + password
- JWT-protected inbox APIs
- Public profile routes (`/u/:username`) for anonymous message submissions
- Anonymous messaging (no sender identity stored)
- Dashboard for inbox management:
  - List messages
  - Delete messages
  - Mark read/unread
  - React/like messages (optional extra)
- Spam protection via rate-limiting
- Input validation and sanitization for XSS/NoSQL injection basics
- Dark mode, smooth animations, responsive Gen Z style UI
- Toast notifications and copyable profile link

## Project Structure

```text
anonymous-message-application/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
  frontend/
    src/
      api/
      components/
      context/
      pages/
      App.jsx
      main.jsx
```

## Backend Setup

1. Go to backend:
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - Copy `.env.example` to `.env`
4. Start backend:
   - Dev: `npm run dev`
   - Prod: `npm start`

### Backend Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/anonymous_messages
JWT_SECRET=super_secret_change_me
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

## Frontend Setup

1. Go to frontend:
   - `cd frontend`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - Copy `.env.example` to `.env`
4. Start frontend:
   - `npm run dev`

### Frontend Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/messages` (auth required)
- `POST /api/messages/:username` (anonymous send)
- `DELETE /api/messages/:id` (auth required)
- `PATCH /api/messages/:id/read` (auth required)
- `PATCH /api/messages/:id/react` (auth required, optional extra)

## Deployment

### Frontend (Vercel)

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Env var: `VITE_API_BASE_URL=<your-render-backend-url>/api`

### Backend (Render)

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add all backend env variables in Render dashboard
- Ensure MongoDB network access allows Render host

## Run With Docker (One Command)

### Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Start all services

From project root:

- `docker compose up --build`

This starts:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

### Stop services

- `docker compose down`

To also remove MongoDB data volume:

- `docker compose down -v`

## Security Notes

- Password hashing with bcrypt
- JWT-based session auth
- Helmet for security headers
- Rate limiting for API and anonymous message posting
- Request sanitization (`xss-clean`, `express-mongo-sanitize`)
- Basic validation for username, email, password, and message content

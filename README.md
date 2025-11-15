# Health Tracker — MERN Stack (Production-ready)

## Live Apps
- Frontend: https://your-frontend.vercel.app
- Backend API: https://your-backend.onrender.com/api

## Features
- Secure JWT authentication
- Profile management
- Health metric logging (weight, blood pressure, heart rate)
- Data visualization with charts
- CI/CD via GitHub Actions (deploys to Vercel + Render)
- Monitoring (Sentry + uptime checks)
- Production-grade HTTP security headers and rate limiting

## Setup (local)
1. Clone repo
2. Backend
   - cd backend
   - cp .env.example .env (fill values)
   - npm ci
   - npm run dev
3. Frontend
   - cd frontend
   - cp .env.example .env
   - npm ci
   - npm run dev

## Deployment
- Frontend: Vercel (link repo -> set root to `frontend/`)
- Backend: Render Web Service (use `backend/`)

## CI/CD
- GitHub Actions pipeline in `.github/workflows/ci-cd.yml`
- Secrets required:
  - VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID
  - RENDER_API_KEY, RENDER_SERVICE_ID

## Monitoring
- Sentry for error tracking; set SENTRY_DSN in backend
- Uptime monitor should ping `/health`

## Docs & Maintenance
- Database backups: MongoDB Atlas automated backups (configure retention)
- Rollback: use Render/Vercel dashboard to rollback to last successful deploy

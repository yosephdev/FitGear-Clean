# Deploy the backend to Vercel (backend project)

This repository contains both a frontend and a backend. To keep them separate, you can create
an independent Vercel project that deploys the `backend/` folder as its project root. Follow
these copy/paste steps.

1) Create a new Vercel project
   - Go to https://vercel.com/dashboard
   - Click "New Project" -> "Import Git Repository" -> choose this repository.
   - In the import settings, set **Root Directory** to `backend` (enter `backend` in the field).
   - Keep the rest default.

2) Add environment variables (Production)
   - In the new Vercel project's Settings -> Environment Variables, add:
     - `MONGO_URL` = your production MongoDB connection string
     - `SECRET_KEY` = (if your backend requires it)
     - Any other backend envs from `backend/.env` or `.env.example`

3) Deploy
   - After import, click Deploy. The Vercel build logs will show the Python runtime building
     and deploying your `api/index.py` as the single handler for routes.

4) Verify
   - Visit your new backend domain (e.g., `https://<your-backend>.vercel.app/api/health`)
   - Test `/api/products` (if you wired that route) or whatever endpoints your backend exposes.

Notes
 - This backend expects Python serverless functions (see `backend/vercel.json`).
 - If you want to automate deployments from GitHub Actions, use the workflow template below
   (requires a `VERCEL_TOKEN` repository secret and `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID`).

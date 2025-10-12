# Vercel deployment checklist — make the frontend and API available on the same domain

If your site is showing the static app but the `/api` routes return HTML or 404, the most
common cause is that the Vercel project was created to build only the `frontend` subfolder.
Serverless functions in the repository root (the `api/` folder) won't be deployed unless the
project root is the repository root.

Follow these exact steps to fix it (copy/paste friendly):

1) Identify the Vercel project that serves your site
   - Go to https://vercel.com/dashboard
   - Find the project that corresponds to your domain (e.g. `fit-gear-one`).

2) Check the project's Git Root Directory
   - In the project, open Settings -> Git -> Root Directory (or General -> Git settings)
   - If Root Directory is set to `frontend` (or any subfolder), change it to the repository root (`/`).
     - Click the edit icon, set to `/` (empty) or remove the subpath and save.

3) Add or confirm Environment Variables
   - In Settings -> Environment Variables add:
     - Key: `REACT_APP_API_URL`
     - Value: `https://<your-backend-base-url>` (example: `https://fit-gear-one.vercel.app` if API will be on same domain)
     - Environment: Production
   - If your backend is deployed separately, set `REACT_APP_API_URL` to the backend's base URL.

4) Redeploy the project
   - After saving settings, trigger a Redeploy from the Deployments tab (click "Redeploy")
   - Watch the Build Logs for any errors.

5) Verify the API routes are available
   - After a successful deployment, run:
     curl -i https://<your-domain>/api/products
   - Expect: HTTP 200 with Content-Type: application/json and body like {"products": [...]}

6) If the domain still returns NOT_FOUND
   - Confirm the domain is attached to the same project (Project -> Domains)
   - If the domain belongs to another project, either move it or set the correct project as the primary
     for that domain.

Notes & troubleshooting
 - If your backend must remain separate, keep the frontend Root Directory set to `frontend`, but
   set `REACT_APP_API_URL` to the backend base URL (step 3) and redeploy.
 - If you're using a custom domain, check DNS in your registrar: CNAME should point to the project
   or follow Vercel's domain verification instructions.

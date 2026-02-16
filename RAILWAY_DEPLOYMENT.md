# Railway Backend Deployment Guide

## Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with your GitHub account
3. Authorize Railway to access your GitHub repositories

## Step 2: Create New Project
1. Click "New Project" on Railway dashboard
2. Select "Deploy from GitHub repo"
3. Choose your repository: `AyanBis/ai-personal-finance-advisor`
4. Railway will detect your repository

## Step 3: Configure Root Directory
1. After selecting the repository, click on the service
2. Go to "Settings" tab
3. Find "Root Directory" setting
4. Set it to: `backend`
5. Click "Save"

## Step 4: Add Environment Variables
1. In your Railway project, click on "Variables" tab
2. Add the following environment variables:

```
NODE_ENV=production
SUPABASE_URL=https://nqlbndhipjzxwxmddsry.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xbGJuZGhpcGp6eHd4bWRkc3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMzQ0NTIsImV4cCI6MjA4NjgxMDQ1Mn0.utS_gUjdMRYZ5MYrQ1Tdb2z6_r5GOoBgPnD8aBhajgY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xbGJuZGhpcGp6eHd4bWRkc3J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIzNDQ1MiwiZXhwIjoyMDg2ODEwNDUyfQ.oXSoLPNXBGFLFd5uq8ecfN4dMDuZE3u4FbEYIgkAWXE
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Note: Replace `https://your-vercel-app.vercel.app` with your actual Vercel deployment URL

3. Railway will automatically provide the `PORT` variable - don't add it manually

## Step 5: Deploy
1. Railway will automatically start building and deploying
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll see a green "Active" status

## Step 6: Get Your Railway Backend URL
1. In Railway, click on your service
2. Go to "Settings" tab
3. Scroll to "Domains" section
4. Click "Generate Domain"
5. Copy the generated URL (e.g., `https://your-app.up.railway.app`)

## Step 7: Update Vercel Frontend Environment Variable
1. Go to your Vercel dashboard
2. Select your frontend project
3. Go to "Settings" > "Environment Variables"
4. Find `VITE_API_URL` variable
5. Update its value to: `https://your-railway-url.up.railway.app/api`
   (Replace with your actual Railway URL from Step 6)
6. Click "Save"

## Step 8: Redeploy Frontend on Vercel
1. Go to "Deployments" tab in Vercel
2. Click on the three dots next to the latest deployment
3. Click "Redeploy"
4. Wait for redeployment to complete

## Step 9: Update Railway FRONTEND_URL (Optional but Recommended)
1. Go back to Railway
2. Click on "Variables" tab
3. Update `FRONTEND_URL` to your Vercel URL
4. Railway will automatically redeploy

## Step 10: Test Your Application
1. Open your Vercel frontend URL
2. Login with your credentials
3. Try uploading a CSV file
4. Check if data appears on dashboard and analytics

## Troubleshooting

### Build Fails
- Check Railway logs for error messages
- Ensure `backend` is set as root directory
- Verify all environment variables are set correctly

### CSV Upload Fails
- Check Railway logs for backend errors
- Verify `VITE_API_URL` in Vercel points to Railway URL with `/api` suffix
- Ensure CORS is configured correctly (FRONTEND_URL matches Vercel URL)

### 500 Internal Server Error
- Check Railway logs
- Verify Supabase credentials are correct
- Ensure database schema is properly set up in Supabase

## Important Notes
- Railway provides 500 hours of free usage per month
- Your backend will sleep after 15 minutes of inactivity on free plan
- First request after sleep may take 10-20 seconds to wake up
- Consider upgrading to Railway Pro for production use

## Current Configuration
- Backend Repository: https://github.com/AyanBis/ai-personal-finance-advisor
- Backend Root Directory: `backend`
- Build Command: Automatic (npm install + npm run build)
- Start Command: `npm start`
- Supabase Project: nqlbndhipjzxwxmddsry

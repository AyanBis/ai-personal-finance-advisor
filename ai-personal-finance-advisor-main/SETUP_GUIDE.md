# Complete Setup Guide - AI Finance Advisor

## Quick Start (5 minutes)

### Step 1: Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in:
   - Name: `ai-finance-advisor`
   - Database Password: (save this)
   - Region: Choose closest to you
4. Wait 2 minutes for project creation

### Step 2: Run Database Schema

1. In your Supabase project, go to "SQL Editor"
2. Click "New Query"
3. Copy the entire contents of `backend/src/database/schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

### Step 3: Get API Credentials

1. Go to Settings > API
2. Copy these values:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key

### Step 4: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and paste your Supabase credentials:
```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

You should see: `Server running on port 3001`

### Step 5: Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

Start frontend:
```bash
npm run dev
```

You should see: `Local: http://localhost:5173/`

### Step 6: Test the Application

1. Open browser to `http://localhost:5173`
2. Click "Sign up"
3. Create account with email/password
4. You'll be redirected to dashboard
5. Click "Upload CSV"
6. Upload `sample-transactions.csv` from project root
7. Explore the features

## Creating an Admin User

After signing up, run this in Supabase SQL Editor:

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

Then refresh the page and you'll see the Admin menu.

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify Supabase credentials in `.env`
- Run `npm install` again

### Frontend won't start
- Check if port 5173 is available
- Verify `.env` file exists
- Run `npm install` again

### Can't login
- Check browser console for errors
- Verify Supabase project is active
- Check if schema was run successfully

### CSV upload fails
- Ensure CSV has columns: date, description, amount
- Date format must be YYYY-MM-DD
- Amount must be a positive number

### Charts not showing
- Upload transactions first
- Wait a few seconds for data processing
- Refresh the page

## Features to Test

1. **Dashboard**
   - View summary cards
   - Upload CSV
   - See category breakdown

2. **Transactions**
   - View all transactions
   - Filter by category
   - Search transactions
   - Delete transactions

3. **Analytics**
   - Pie chart of categories
   - Bar chart comparison
   - Monthly trend line

4. **AI Advisor**
   - Generate insights
   - View recommendations
   - See predictions

5. **Admin** (if admin role)
   - View all users
   - System statistics
   - Upload logs
   - Manage users

## Production Deployment

### Backend (Railway/Heroku)

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set environment variables
4. Start command: `node dist/index.js`

### Frontend (Vercel/Netlify)

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set environment variables
4. Configure redirects for SPA

## Next Steps

- Customize categories in `backend/src/utils/categorizer.ts`
- Adjust anomaly threshold in `backend/src/utils/categorizer.ts`
- Modify AI insights in `backend/src/services/aiService.ts`
- Customize theme colors in `frontend/tailwind.config.js`
- Add more chart types in Analytics page

## Support

If you encounter issues:
1. Check console logs (browser and terminal)
2. Verify all environment variables
3. Ensure Supabase project is active
4. Check database tables were created

## Security Notes

- Never commit `.env` files
- Use strong passwords
- Enable 2FA on Supabase
- Rotate API keys regularly
- Use HTTPS in production

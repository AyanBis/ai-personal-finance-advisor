# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)

## Step 1: Supabase Setup (2 minutes)

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in project details and wait for creation
4. Go to SQL Editor and run the schema:
   - Copy all content from `backend/src/database/schema.sql`
   - Paste in SQL Editor and click "Run"
5. Go to Settings > API and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

## Step 2: Configure Backend

Edit `backend/.env`:
```env
PORT=3001
NODE_ENV=development

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

FRONTEND_URL=http://localhost:5173
```

## Step 3: Configure Frontend

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## Step 4: Start Backend

```bash
cd backend
npm run dev
```

Should see: `🚀 Server running on port 3001`

## Step 5: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Should see: `Local: http://localhost:5173/`

## Step 6: Test

1. Open http://localhost:5173
2. Click "Sign up" and create account
3. Upload `sample-transactions.csv`
4. Explore features!

## Make Admin User

In Supabase SQL Editor:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

## Troubleshooting

**Backend won't start:**
- Check Supabase credentials in `.env`
- Ensure port 3001 is free

**Frontend won't start:**
- Check `.env` file exists
- Ensure port 5173 is free

**Can't login:**
- Verify Supabase schema was run
- Check browser console for errors

**CSV upload fails:**
- Use format: date,description,amount
- Date must be YYYY-MM-DD
- Amount must be positive number

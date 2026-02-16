# AI-Powered Personal Financial Advisor

A production-ready full-stack web application for personal finance management with AI-driven insights, anomaly detection, and spending predictions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## Features

### User Features
- Secure authentication (login/signup/password reset)
- CSV expense upload with automatic categorization
- Real-time dashboard with financial metrics
- Transaction management with filtering and search
- Interactive analytics with charts (Recharts)
- Anomaly detection for unusual spending
- AI-powered spending predictions
- Personalized financial recommendations
- Light/Dark mode support
- Responsive design

### Admin Features
- User management dashboard
- System analytics and monitoring
- CSV upload logs
- User role management

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- ShadCN UI components
- Recharts
- React Router
- Vite

### Backend
- Node.js + Express + TypeScript
- Supabase (PostgreSQL)
- Supabase Auth
- Row Level Security

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/AyanBis/ai-personal-finance-advisor.git
cd ai-personal-finance-advisor
```

### 2. Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Run SQL schema from `backend/src/database/schema.sql`
3. Get API keys from Settings > API

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

### 5. Open Application

Visit `http://localhost:5173`

## CSV Format

```csv
date,description,amount
2026-01-15,Grocery Store,125.50
2026-01-16,Gas Station,45.00
```

Sample file included: `sample-transactions.csv`

## Project Structure

```
ai-finance-advisor/
├── backend/          # Node.js + Express API
├── frontend/         # React + TypeScript
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `POST /api/auth/reset-password` - Reset password

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions/upload` - Upload CSV
- `DELETE /api/transactions/:id` - Delete transaction

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/category-breakdown` - Category spending
- `GET /api/analytics/monthly-trend` - Monthly trends
- `GET /api/analytics/anomalies` - Unusual transactions

### AI Insights
- `POST /api/ai/generate-insights` - Generate new insights
- `GET /api/ai/insights` - Get saved insights

### Admin
- `GET /api/admin/users` - All users
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/upload-logs` - Upload history
- `DELETE /api/admin/users/:id` - Delete user
- `PATCH /api/admin/users/:id/role` - Update user role

## Features in Detail

### Automatic Categorization
Transactions are automatically categorized using keyword matching into categories like Food, Transport, Utilities, Shopping, Entertainment, Healthcare, Education, Bills, Rent, Groceries, Travel, and Miscellaneous.

### Anomaly Detection
Detects unusual spending patterns by identifying transactions that are 2.5x above the category average. These are highlighted in the dashboard and analytics.

### Spending Prediction
Uses historical data from the last 3 months to predict next month's spending, considering trends and patterns.

### AI Recommendations
Provides personalized financial advice based on spending patterns, category distribution, detected anomalies, and month-over-month trends.

## Security Features

- JWT-based authentication via Supabase
- Row Level Security (RLS) policies
- CORS protection
- Helmet.js security headers
- Password hashing
- Protected API routes
- Input validation

## Deployment

### Backend
Deploy to Railway, Heroku, or similar platforms. Build with `npm run build` and start with `node dist/index.js`.

### Frontend
Deploy to Vercel, Netlify, or similar platforms. Build with `npm run build` and deploy the `dist/` folder.

## License

MIT License

## Author

Ayan Biswas - [GitHub](https://github.com/AyanBis)

---

Made with care for better financial management

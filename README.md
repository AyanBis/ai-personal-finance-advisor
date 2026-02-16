# AI-Powered Personal Financial Advisor

A production-ready full-stack web application for personal finance management with AI-driven insights, anomaly detection, and spending predictions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 🌟 Features

### User Features
- ✅ Secure authentication (login/signup/password reset)
- ✅ CSV expense upload with automatic categorization
- ✅ Real-time dashboard with financial metrics
- ✅ Transaction management with filtering and search
- ✅ Interactive analytics with charts (Recharts)
- ✅ Anomaly detection for unusual spending
- ✅ AI-powered spending predictions
- ✅ Personalized financial recommendations
- ✅ Light/Dark mode support
- ✅ Responsive design

### Admin Features
- ✅ User management dashboard
- ✅ System analytics and monitoring
- ✅ CSV upload logs
- ✅ User role management

## 🛠️ Tech Stack

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

## ⚡ Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/ai-finance-advisor.git
cd ai-finance-advisor
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

## 📊 CSV Format

```csv
date,description,amount
2026-01-15,Grocery Store,125.50
2026-01-16,Gas Station,45.00
```

Sample file included: `sample-transactions.csv`

## 📁 Project Structure

```
ai-finance-advisor/
├── backend/          # Node.js + Express API
├── frontend/         # React + TypeScript
└── README.md
```

## 🚀 Deployment

- **Backend**: Railway, Heroku, or similar
- **Frontend**: Vercel, Netlify, or similar

## 📄 License

MIT License

## 👥 Author

Your Name - [GitHub](https://github.com/yourusername)

---

Made with ❤️ for better financial management

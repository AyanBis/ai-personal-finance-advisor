/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Transaction {
  id: string;
  user_id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  is_anomaly: boolean;
  created_at: string;
}

export interface DashboardStats {
  totalMonthlySpending: number;
  highestSpendingCategory: string;
  predictedNextMonth: number;
  anomalyCount: number;
  categoryBreakdown: Record<string, number>;
}

export interface AIInsight {
  id: string;
  user_id: string;
  insight_type: string;
  content: string;
  created_at: string;
}

export interface MonthlyTrend {
  month: string;
  spending: number;
}

export interface UploadLog {
  id: string;
  user_id: string;
  filename: string;
  rows_processed: number;
  status: string;
  error_message?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
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

export interface AnalyticsSummary {
  id: string;
  user_id: string;
  month: string;
  total_spent: number;
  category_breakdown: Record<string, number>;
  created_at: string;
}

export interface AIInsight {
  id: string;
  user_id: string;
  insight_type: string;
  content: string;
  created_at: string;
}

export interface UploadLog {
  id: string;
  user_id: string;
  filename: string;
  rows_processed: number;
  status: 'success' | 'failed' | 'partial';
  error_message?: string;
  created_at: string;
}

export const CATEGORIES = [
  'Food',
  'Transport',
  'Utilities',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Education',
  'Bills',
  'Rent',
  'Groceries',
  'Travel',
  'Miscellaneous'
] as const;

export type Category = typeof CATEGORIES[number];

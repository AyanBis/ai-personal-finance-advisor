import { supabase } from '../lib/supabase';
import { Transaction } from '../types';
import { categorizeTransaction, detectAnomaly } from '../utils/categorizer';

export class TransactionService {
  async getTransactions(userId: string, filters?: {
    category?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('transactions')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.startDate) {
      query = query.gte('date', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('date', filters.endDate);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { transactions: data, total: count };
  }

  async createTransaction(userId: string, transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        ...transaction
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async bulkCreateTransactions(userId: string, transactions: any[]) {
    const categoryAverages = await this.getCategoryAverages(userId);

    const processedTransactions = transactions.map(t => {
      const category = t.category || categorizeTransaction(t.description);
      const amount = parseFloat(t.amount);
      const isAnomaly = detectAnomaly(amount, categoryAverages[category] || amount);

      return {
        user_id: userId,
        date: t.date,
        description: t.description,
        category,
        amount,
        is_anomaly: isAnomaly
      };
    });

    const { data, error } = await supabase
      .from('transactions')
      .insert(processedTransactions)
      .select();

    if (error) throw error;
    return data;
  }

  async getCategoryAverages(userId: string): Promise<Record<string, number>> {
    const { data, error } = await supabase
      .from('transactions')
      .select('category, amount')
      .eq('user_id', userId);

    if (error || !data) return {};

    const categoryTotals: Record<string, { sum: number; count: number }> = {};

    data.forEach(t => {
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = { sum: 0, count: 0 };
      }
      categoryTotals[t.category].sum += parseFloat(t.amount.toString());
      categoryTotals[t.category].count += 1;
    });

    const averages: Record<string, number> = {};
    Object.entries(categoryTotals).forEach(([category, { sum, count }]) => {
      averages[category] = sum / count;
    });

    return averages;
  }

  async deleteTransaction(userId: string, transactionId: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId)
      .eq('user_id', userId);

    if (error) throw error;
  }
}

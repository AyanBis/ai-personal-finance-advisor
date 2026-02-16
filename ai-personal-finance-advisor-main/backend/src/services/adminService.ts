import { supabase } from '../lib/supabase';

export class AdminService {
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getUserStats() {
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: totalTransactions } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true });

    const { data: spendingData } = await supabase
      .from('transactions')
      .select('amount');

    const totalSpending = spendingData?.reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0) || 0;
    const avgSpending = totalTransactions ? totalSpending / totalTransactions : 0;

    return {
      totalUsers: totalUsers || 0,
      totalTransactions: totalTransactions || 0,
      averageSpending: avgSpending
    };
  }

  async getUploadLogs(limit: number = 50) {
    const { data, error } = await supabase
      .from('upload_logs')
      .select('*, users(email)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async deleteUser(userId: string) {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;
  }

  async updateUserRole(userId: string, role: 'user' | 'admin') {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

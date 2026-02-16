import { supabase } from '../lib/supabase';

export class AnalyticsService {
  async getDashboardStats(userId: string) {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);

    const [currentMonthData, anomalies, categoryBreakdown] = await Promise.all([
      this.getMonthlySpending(userId, currentMonth),
      this.getAnomalies(userId),
      this.getCategoryBreakdown(userId, currentMonth)
    ]);

    const highestCategory = Object.entries(categoryBreakdown)
      .sort(([, a], [, b]) => b - a)[0];

    const prediction = await this.predictNextMonth(userId);

    return {
      totalMonthlySpending: currentMonthData,
      highestSpendingCategory: highestCategory ? highestCategory[0] : 'N/A',
      predictedNextMonth: prediction,
      anomalyCount: anomalies.length,
      categoryBreakdown
    };
  }

  async getMonthlySpending(userId: string, month: string) {
    const startDate = `${month}-01`;
    const endDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)).toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lt('date', endDate);

    if (error) throw error;

    return data?.reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0) || 0;
  }

  async getCategoryBreakdown(userId: string, month?: string) {
    let query = supabase
      .from('transactions')
      .select('category, amount')
      .eq('user_id', userId);

    if (month) {
      const startDate = `${month}-01`;
      const endDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)).toISOString().slice(0, 10);
      query = query.gte('date', startDate).lt('date', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    const breakdown: Record<string, number> = {};
    data?.forEach(t => {
      breakdown[t.category] = (breakdown[t.category] || 0) + parseFloat(t.amount.toString());
    });

    return breakdown;
  }

  async getAnomalies(userId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_anomaly', true)
      .order('date', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  }

  async getMonthlyTrend(userId: string, months: number = 6) {
    const trends = [];
    const currentDate = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const month = date.toISOString().slice(0, 7);
      
      const spending = await this.getMonthlySpending(userId, month);
      trends.push({
        month,
        spending
      });
    }

    return trends;
  }

  async predictNextMonth(userId: string): Promise<number> {
    const trends = await this.getMonthlyTrend(userId, 3);
    
    if (trends.length === 0) return 0;

    const average = trends.reduce((sum, t) => sum + t.spending, 0) / trends.length;
    
    if (trends.length < 2) return average;

    const recentTrend = trends[trends.length - 1].spending - trends[trends.length - 2].spending;
    
    return Math.max(0, average + recentTrend * 0.5);
  }

  async saveAnalyticsSummary(userId: string, month: string) {
    const totalSpent = await this.getMonthlySpending(userId, month);
    const categoryBreakdown = await this.getCategoryBreakdown(userId, month);

    const { data, error } = await supabase
      .from('analytics_summary')
      .upsert({
        user_id: userId,
        month,
        total_spent: totalSpent,
        category_breakdown: categoryBreakdown
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

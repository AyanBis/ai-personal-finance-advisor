import { supabase } from '../lib/supabase';
import { AnalyticsService } from './analyticsService';

export class AIService {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  async generateInsights(userId: string) {
    const stats = await this.analyticsService.getDashboardStats(userId);
    const trends = await this.analyticsService.getMonthlyTrend(userId, 6);
    const anomalies = await this.analyticsService.getAnomalies(userId);

    const insights = [];

    // Spending pattern insight
    const spendingPattern = this.analyzeSpendingPattern(trends);
    insights.push({
      type: 'spending_pattern',
      content: spendingPattern
    });

    // Category insight
    const categoryInsight = this.analyzeCategorySpending(stats.categoryBreakdown);
    insights.push({
      type: 'category_analysis',
      content: categoryInsight
    });

    // Anomaly insight
    if (anomalies.length > 0) {
      const anomalyInsight = this.analyzeAnomalies(anomalies);
      insights.push({
        type: 'anomaly_alert',
        content: anomalyInsight
      });
    }

    // Prediction insight
    const predictionInsight = this.analyzePrediction(stats.totalMonthlySpending, stats.predictedNextMonth);
    insights.push({
      type: 'prediction',
      content: predictionInsight
    });

    // Recommendations
    const recommendations = this.generateRecommendations(stats, trends);
    insights.push({
      type: 'recommendations',
      content: recommendations
    });

    // Save insights to database
    for (const insight of insights) {
      await supabase.from('ai_insights').insert({
        user_id: userId,
        insight_type: insight.type,
        content: insight.content
      });
    }

    return insights;
  }

  private analyzeSpendingPattern(trends: any[]): string {
    if (trends.length < 2) {
      return "Not enough data to analyze spending patterns. Keep tracking your expenses!";
    }

    const recentSpending = trends.slice(-3).map(t => t.spending);
    const average = recentSpending.reduce((a, b) => a + b, 0) / recentSpending.length;
    const latest = recentSpending[recentSpending.length - 1];

    if (latest > average * 1.2) {
      return `Your spending has increased by ${((latest / average - 1) * 100).toFixed(1)}% compared to your recent average. Consider reviewing your recent purchases.`;
    } else if (latest < average * 0.8) {
      return `Great job! Your spending decreased by ${((1 - latest / average) * 100).toFixed(1)}% compared to your recent average.`;
    } else {
      return `Your spending is consistent with your recent patterns, averaging $${average.toFixed(2)} per month.`;
    }
  }

  private analyzeCategorySpending(breakdown: Record<string, number>): string {
    const sorted = Object.entries(breakdown).sort(([, a], [, b]) => b - a);
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    if (sorted.length === 0) {
      return "No spending data available for category analysis.";
    }

    const top = sorted[0];
    const percentage = ((top[1] / total) * 100).toFixed(1);

    return `Your highest spending category is ${top[0]}, accounting for ${percentage}% of your total expenses ($${top[1].toFixed(2)}). ${
      parseFloat(percentage) > 40 ? 'This is a significant portion of your budget. Consider if this aligns with your financial goals.' : ''
    }`;
  }

  private analyzeAnomalies(anomalies: any[]): string {
    const recentAnomalies = anomalies.slice(0, 3);
    const descriptions = recentAnomalies.map(a => `${a.description} ($${a.amount})`).join(', ');

    return `We detected ${anomalies.length} unusual transactions recently: ${descriptions}. These are significantly higher than your typical spending in these categories.`;
  }

  private analyzePrediction(current: number, predicted: number): string {
    const diff = predicted - current;
    const percentChange = ((diff / current) * 100).toFixed(1);

    if (Math.abs(diff) < current * 0.1) {
      return `Based on your spending patterns, we predict your next month's spending will be around $${predicted.toFixed(2)}, similar to this month.`;
    } else if (diff > 0) {
      return `We predict your spending may increase to $${predicted.toFixed(2)} next month (${percentChange}% increase). Plan accordingly!`;
    } else {
      return `Good news! We predict your spending may decrease to $${predicted.toFixed(2)} next month (${Math.abs(parseFloat(percentChange))}% decrease).`;
    }
  }

  private generateRecommendations(stats: any, trends: any[]): string {
    const recommendations = [];

    // High spending recommendation
    if (stats.totalMonthlySpending > 3000) {
      recommendations.push("Consider setting a monthly budget limit to control spending");
    }

    // Category-specific recommendations
    const breakdown = stats.categoryBreakdown;
    if (breakdown['Entertainment'] > breakdown['Healthcare']) {
      recommendations.push("You're spending more on entertainment than healthcare. Consider balancing these priorities");
    }

    if (breakdown['Food'] > 500) {
      recommendations.push("Food expenses are high. Try meal planning or cooking at home more often");
    }

    // Trend-based recommendations
    const isIncreasing = trends.length >= 2 && 
      trends[trends.length - 1].spending > trends[trends.length - 2].spending;

    if (isIncreasing) {
      recommendations.push("Your spending trend is increasing. Review recent purchases and identify areas to cut back");
    }

    // Anomaly-based
    if (stats.anomalyCount > 3) {
      recommendations.push("Multiple unusual transactions detected. Review these carefully to avoid overspending");
    }

    return recommendations.length > 0 
      ? recommendations.join('. ') + '.'
      : "Keep up the good work! Your spending habits look healthy.";
  }

  async getInsights(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

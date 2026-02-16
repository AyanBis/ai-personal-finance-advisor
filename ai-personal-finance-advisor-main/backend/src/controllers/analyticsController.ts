import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { AnalyticsService } from '../services/analyticsService';

const analyticsService = new AnalyticsService();

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await analyticsService.getDashboardStats(req.user!.id);
    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

export const getCategoryBreakdown = async (req: AuthRequest, res: Response) => {
  try {
    const { month } = req.query;
    const breakdown = await analyticsService.getCategoryBreakdown(
      req.user!.id,
      month as string
    );
    res.json(breakdown);
  } catch (error) {
    console.error('Category breakdown error:', error);
    res.status(500).json({ error: 'Failed to fetch category breakdown' });
  }
};

export const getMonthlyTrend = async (req: AuthRequest, res: Response) => {
  try {
    const { months } = req.query;
    const trend = await analyticsService.getMonthlyTrend(
      req.user!.id,
      months ? parseInt(months as string) : 6
    );
    res.json(trend);
  } catch (error) {
    console.error('Monthly trend error:', error);
    res.status(500).json({ error: 'Failed to fetch monthly trend' });
  }
};

export const getAnomalies = async (req: AuthRequest, res: Response) => {
  try {
    const anomalies = await analyticsService.getAnomalies(req.user!.id);
    res.json(anomalies);
  } catch (error) {
    console.error('Anomalies error:', error);
    res.status(500).json({ error: 'Failed to fetch anomalies' });
  }
};

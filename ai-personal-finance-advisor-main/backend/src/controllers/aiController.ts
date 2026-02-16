import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { AIService } from '../services/aiService';

const aiService = new AIService();

export const generateInsights = async (req: AuthRequest, res: Response) => {
  try {
    const insights = await aiService.generateInsights(req.user!.id);
    res.json(insights);
  } catch (error) {
    console.error('Generate insights error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
};

export const getInsights = async (req: AuthRequest, res: Response) => {
  try {
    const { limit } = req.query;
    const insights = await aiService.getInsights(
      req.user!.id,
      limit ? parseInt(limit as string) : 10
    );
    res.json(insights);
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
};

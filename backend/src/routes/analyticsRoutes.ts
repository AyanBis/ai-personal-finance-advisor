import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  getDashboardStats,
  getCategoryBreakdown,
  getMonthlyTrend,
  getAnomalies
} from '../controllers/analyticsController';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardStats);
router.get('/category-breakdown', getCategoryBreakdown);
router.get('/monthly-trend', getMonthlyTrend);
router.get('/anomalies', getAnomalies);

export default router;

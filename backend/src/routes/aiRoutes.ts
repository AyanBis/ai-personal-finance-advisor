import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { generateInsights, getInsights } from '../controllers/aiController';

const router = Router();

router.use(authenticate);

router.post('/generate-insights', generateInsights);
router.get('/insights', getInsights);

export default router;

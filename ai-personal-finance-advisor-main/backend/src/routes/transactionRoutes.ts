import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../middlewares/auth';
import { getTransactions, uploadCSV, deleteTransaction } from '../controllers/transactionController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticate);

router.get('/', getTransactions);
router.post('/upload', upload.single('file'), uploadCSV);
router.delete('/:id', deleteTransaction);

export default router;

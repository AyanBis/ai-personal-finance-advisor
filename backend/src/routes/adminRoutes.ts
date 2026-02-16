import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/auth';
import {
  getAllUsers,
  getUserStats,
  getUploadLogs,
  deleteUser,
  updateUserRole
} from '../controllers/adminController';

const router = Router();

router.use(authenticate);
router.use(requireAdmin);

router.get('/users', getAllUsers);
router.get('/stats', getUserStats);
router.get('/upload-logs', getUploadLogs);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/role', updateUserRole);

export default router;

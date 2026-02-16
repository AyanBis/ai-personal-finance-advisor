import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { AdminService } from '../services/adminService';

const adminService = new AdminService();

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await adminService.getUserStats();
    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
};

export const getUploadLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { limit } = req.query;
    const logs = await adminService.getUploadLogs(
      limit ? parseInt(limit as string) : 50
    );
    res.json(logs);
  } catch (error) {
    console.error('Get upload logs error:', error);
    res.status(500).json({ error: 'Failed to fetch upload logs' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await adminService.updateUserRole(id, role);
    res.json(user);
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

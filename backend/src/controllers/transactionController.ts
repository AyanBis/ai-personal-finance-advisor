import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { TransactionService } from '../services/transactionService';
import { parseCSV, validateCSVRow } from '../utils/csvParser';
import { supabase } from '../lib/supabase';

const transactionService = new TransactionService();

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const { category, startDate, endDate, limit, offset } = req.query;

    const result = await transactionService.getTransactions(req.user!.id, {
      category: category as string,
      startDate: startDate as string,
      endDate: endDate as string,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined
    });

    res.json(result);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const uploadCSV = async (req: AuthRequest, res: Response) => {
  try {
    console.log('CSV Upload started');
    console.log('User ID:', req.user?.id);
    console.log('File:', req.file?.originalname);
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const rows = await parseCSV(req.file.buffer);
    console.log('Parsed rows:', rows.length);
    
    const validRows = rows.filter(validateCSVRow);
    console.log('Valid rows:', validRows.length);

    if (validRows.length === 0) {
      await supabase.from('upload_logs').insert({
        user_id: req.user!.id,
        filename: req.file.originalname,
        rows_processed: 0,
        status: 'failed',
        error_message: 'No valid rows found'
      });

      return res.status(400).json({ error: 'No valid rows in CSV' });
    }

    console.log('Creating transactions...');
    const transactions = await transactionService.bulkCreateTransactions(
      req.user!.id,
      validRows
    );
    console.log('Transactions created:', transactions?.length);

    await supabase.from('upload_logs').insert({
      user_id: req.user!.id,
      filename: req.file.originalname,
      rows_processed: validRows.length,
      status: 'success'
    });

    res.json({
      message: 'CSV uploaded successfully',
      processed: validRows.length,
      total: rows.length,
      transactions
    });
  } catch (error) {
    console.error('CSV upload error:', error);
    
    await supabase.from('upload_logs').insert({
      user_id: req.user!.id,
      filename: req.file?.originalname || 'unknown',
      rows_processed: 0,
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });

    res.status(500).json({ error: 'Failed to process CSV' });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await transactionService.deleteTransaction(req.user!.id, id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

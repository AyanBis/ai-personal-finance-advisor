import csv from 'csv-parser';
import { Readable } from 'stream';

export interface CSVRow {
  date: string;
  description: string;
  amount: string;
  category?: string;
}

export const parseCSV = (buffer: Buffer): Promise<CSVRow[]> => {
  return new Promise((resolve, reject) => {
    const results: CSVRow[] = [];
    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

export const validateCSVRow = (row: CSVRow): boolean => {
  if (!row.date || !row.description || !row.amount) {
    return false;
  }

  const date = new Date(row.date);
  if (isNaN(date.getTime())) {
    return false;
  }

  const amount = parseFloat(row.amount);
  if (isNaN(amount) || amount <= 0) {
    return false;
  }

  return true;
};

import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/services/api';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, AlertTriangle, Trash2 } from 'lucide-react';

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchTransactions();
  }, [page, categoryFilter]);

  const fetchTransactions = async () => {
    try {
      const params: any = { limit, offset: page * limit };
      if (categoryFilter) params.category = categoryFilter;
      
      const { data } = await api.get('/transactions', { params });
      setTransactions(data.transactions || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this transaction?')) return;
    
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      alert('Failed to delete transaction');
    }
  };

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['All', 'Food', 'Transport', 'Utilities', 'Shopping', 'Entertainment', 
    'Healthcare', 'Education', 'Bills', 'Rent', 'Groceries', 'Travel', 'Miscellaneous'];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Transactions</h1>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value === 'All' ? '' : e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No transactions found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Description</th>
                      <th className="p-4 font-medium">Category</th>
                      <th className="p-4 font-medium text-right">Amount</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{formatDate(transaction.date)}</td>
                        <td className="p-4">{transaction.description}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="p-4 text-right font-medium">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="p-4">
                          {transaction.is_anomaly && (
                            <span className="flex items-center text-destructive text-sm">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Anomaly
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {total > limit && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span className="px-4 py-2">
              Page {page + 1} of {Math.ceil(total / limit)}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage(p => p + 1)}
              disabled={(page + 1) * limit >= total}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}

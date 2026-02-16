import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import api from '@/services/api';
import { AIInsight } from '@/types';
import { formatDate } from '@/lib/utils';
import { Brain, Sparkles, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

export function AIAdvisor() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const { data } = await api.get('/ai/insights');
      setInsights(data);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async () => {
    setGenerating(true);
    try {
      await api.post('/ai/generate-insights');
      await fetchInsights();
    } catch (error) {
      alert('Failed to generate insights');
    } finally {
      setGenerating(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'spending_pattern':
        return <TrendingUp className="h-5 w-5" />;
      case 'category_analysis':
        return <Brain className="h-5 w-5" />;
      case 'anomaly_alert':
        return <AlertCircle className="h-5 w-5" />;
      case 'prediction':
        return <Sparkles className="h-5 w-5" />;
      case 'recommendations':
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  const getInsightTitle = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
          <Button onClick={generateInsights} disabled={generating}>
            <Brain className="h-4 w-4 mr-2" />
            {generating ? 'Generating...' : 'Generate New Insights'}
          </Button>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered Financial Insights</h3>
                <p className="text-muted-foreground">
                  Get personalized recommendations based on your spending patterns, detect anomalies,
                  and receive predictions for future expenses. Our AI analyzes your financial data
                  to help you make better decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Loading insights...</div>
          </div>
        ) : insights.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-4">No insights yet. Generate your first AI insights!</p>
                <Button onClick={generateInsights} disabled={generating}>
                  {generating ? 'Generating...' : 'Generate Insights'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        {getInsightIcon(insight.insight_type)}
                      </div>
                      <CardTitle className="text-lg">
                        {getInsightTitle(insight.insight_type)}
                      </CardTitle>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(insight.created_at)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{insight.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

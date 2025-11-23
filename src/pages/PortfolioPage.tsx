import { useQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/ui/LoadingState';
import { PortfolioValueChart } from '@/components/charts/PortfolioValueChart';
import { HoldingsTable } from '@/components/domain/portfolio/HoldingsTable';
import { InvestmentSummaryCard } from '@/components/domain/portfolio/InvestmentSummaryCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';

export function PortfolioPage() {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: queryKeys.portfolio.summary(),
    queryFn: () => portfolioApi.fetchPortfolioSummary(),
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio</h1>
          <p className="text-sm text-gray-600">View and manage your holdings</p>
        </div>

        {isLoading ? (
          <LoadingState rows={4} type="card" />
        ) : portfolio ? (
          <div className="space-y-6">
            {/* Investment Summary */}
            <InvestmentSummaryCard
              currentValue={portfolio.totalValue}
              oneDayReturns={portfolio.totalGain * 0.1}
              oneDayReturnsPercent={portfolio.totalGainPercent * 0.1}
              totalReturns={portfolio.totalGain}
              totalReturnsPercent={portfolio.totalGainPercent}
              invested={portfolio.totalInvested}
            />

            {/* Portfolio Chart */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PortfolioValueChart data={portfolio.valueHistory} />
              </CardContent>
            </Card>

            {/* Holdings Table */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">
                  All Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HoldingsTable holdings={portfolio.holdings} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">Failed to load portfolio data</p>
          </div>
        )}
      </div>
    </div>
  );
}

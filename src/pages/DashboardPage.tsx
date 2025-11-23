import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { LoadingState } from '@/components/ui/LoadingState';
import { PortfolioValueChart } from '@/components/charts/PortfolioValueChart';
import { HoldingsTable } from '@/components/domain/portfolio/HoldingsTable';
import { portfolioApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { BarChart3 } from 'lucide-react';

export function DashboardPage() {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: queryKeys.portfolio.summary(),
    queryFn: () => portfolioApi.fetchPortfolioSummary(),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your portfolio and investments"
      />

      {isLoading ? (
        <LoadingState rows={4} type="card" />
      ) : portfolio ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Portfolio Value"
              value={`$${portfolio.totalValue.toLocaleString()}`}
              change={portfolio.totalGainPercent}
              icon={<BarChart3 className="h-4 w-4" />}
            />
            <StatCard
              title="Total Invested"
              value={`$${portfolio.totalInvested.toLocaleString()}`}
            />
            <StatCard
              title="Total Gain/Loss"
              value={`$${portfolio.totalGain.toLocaleString()}`}
              change={portfolio.totalGainPercent}
            />
            <StatCard
              title="Available Cash"
              value={`$${portfolio.cash.toLocaleString()}`}
            />
          </div>

          <PortfolioValueChart data={portfolio.valueHistory} />

          <div>
            <h2 className="text-lg font-semibold mb-4">Top Holdings</h2>
            <HoldingsTable holdings={portfolio.holdings.slice(0, 5)} />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load portfolio data</p>
        </div>
      )}
    </div>
  );
}

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { LoadingState } from '@/components/ui/LoadingState';
import { StockPriceChart } from '@/components/charts/StockPriceChart';
import { BuySellPanel } from '@/components/domain/trading/BuySellPanel';
import { TradeSummaryCard } from '@/components/domain/trading/TradeSummaryCard';
import { stocksApi, ordersApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { useAppSelector } from '@/lib/hooks';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export function StockDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [lastOrder, setLastOrder] = useState(null);
  const { cash } = useAppSelector((state) => state.portfolio);

  const { data: stock, isLoading } = useQuery({
    queryKey: queryKeys.stocks.detail(symbol!),
    queryFn: () => stocksApi.fetchStockBySymbol(symbol!),
    enabled: !!symbol,
  });

  const createOrderMutation = useMutation({
    mutationFn: ordersApi.createOrder,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.orders.list() });
        queryClient.invalidateQueries({
          queryKey: queryKeys.portfolio.summary(),
        });
        setLastOrder(data as unknown as never);
        setTimeout(() => setLastOrder(null), 5000);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <LoadingState type="chart" />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Stock not found</p>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <PageHeader
          title={`${stock.symbol} - ${stock.name}`}
          description={stock.description}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Price"
          value={`$${stock.price.toFixed(2)}`}
          change={stock.changePercent}
        />
        <StatCard
          title="Change"
          value={`${isPositive ? '+' : ''}$${stock.change.toFixed(2)}`}
        />
        <StatCard
          title="Market Cap"
          value={stock.marketCap}
        />
        <StatCard
          title="P/E Ratio"
          value={stock.peRatio}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockPriceChart data={stock.priceHistory} symbol={stock.symbol} />
        </div>
        <BuySellPanel
          stock={stock}
          cash={cash}
          onCreateOrder={async (order) => {
            await createOrderMutation.mutateAsync(order);
          }}
          isLoading={createOrderMutation.isPending}
        />
      </div>

      {lastOrder && <TradeSummaryCard order={lastOrder} />}
    </div>
  );
}

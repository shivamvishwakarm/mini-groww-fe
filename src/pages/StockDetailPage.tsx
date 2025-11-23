import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/LoadingState';
import { StockPriceChart } from '@/components/charts/StockPriceChart';
import { BuySellPanel } from '@/components/domain/trading/BuySellPanel';
import { TradeSummaryCard } from '@/components/domain/trading/TradeSummaryCard';
import { Card, CardContent } from '@/components/ui/card';
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
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <LoadingState type="chart" />
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">Stock not found</p>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button */}
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Stock Header */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
            <span className="text-lg text-gray-600">{stock.name}</span>
          </div>
          {stock.description && (
            <p className="text-sm text-gray-600">{stock.description}</p>
          )}
        </div>

        {/* Price and Metrics */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-gray-900">${stock.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}${stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Market Cap</p>
                <p className="text-lg font-semibold text-gray-900">{stock.marketCap}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">P/E Ratio</p>
                <p className="text-lg font-semibold text-gray-900">{stock.peRatio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Change</p>
                <p className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}${stock.change.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart and Trading Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <StockPriceChart data={stock.priceHistory} symbol={stock.symbol} />
              </CardContent>
            </Card>
          </div>
          <div>
            <BuySellPanel
              stock={stock}
              cash={cash}
              onCreateOrder={async (order) => {
                await createOrderMutation.mutateAsync(order);
              }}
              isLoading={createOrderMutation.isPending}
            />
          </div>
        </div>

        {/* Trade Summary */}
        {lastOrder && <TradeSummaryCard order={lastOrder} />}
      </div>
    </div>
  );
}

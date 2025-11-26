import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/LoadingState';
import { StockPriceChart } from '@/components/charts/StockPriceChart';
import { StockOrderPanel } from '@/components/domain/portfolio/StockOrderPanel';
import { Card, CardContent } from '@/components/ui/card';
import { stocksApi, watchlistApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { useAppSelector } from '@/lib/hooks';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';

import { subscribeToStock, unsubscribeFromStock } from '@/lib/socket';


export function StockDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { cash } = useAppSelector((state) => state.portfolio);

  // Get real-time price and history from Redux 
  const realtimePrice = useAppSelector((state) =>
    symbol ? state.market.prices[symbol] : undefined
  );
  const priceHistory = useAppSelector((state) =>
    symbol ? state.market.history[symbol] : undefined
  );

  // Subscribe to stock updates on mount, unsubscribe on unmount
  useEffect(() => {
    if (symbol) {
      subscribeToStock(symbol);
      return () => {
        unsubscribeFromStock(symbol);
      };
    }
  }, [symbol]);

  const { data: stock, isLoading } = useQuery({
    queryKey: queryKeys.stocks.detail(symbol!),
    queryFn: () => stocksApi.fetchStockBySymbol(symbol!),
    enabled: !!symbol,
  });

  const { data: watchlistSymbols } = useQuery({
    queryKey: queryKeys.watchlist.list(),
    queryFn: () => watchlistApi.getWatchlist(),
  });

  const isInWatchlist = watchlistSymbols?.includes(symbol || '');

  const toggleWatchlistMutation = useMutation({
    mutationFn: async () => {
      if (!symbol) return;
      if (isInWatchlist) {
        await watchlistApi.removeFromWatchlist(symbol);
      } else {
        await watchlistApi.addToWatchlist(symbol);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.watchlist.list() });
      toast.success(isInWatchlist ? 'Removed from watchlist' : 'Added to watchlist');
    },
    onError: () => {
      toast.error('Failed to update watchlist');
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

  const currentPrice = realtimePrice?.price ?? stock.currentPrice;
  const change = stock.change ?? (currentPrice - stock.previousClose);
  const changePercent = stock.changePercent ?? ((change / stock.previousClose) * 100);
  const isPositive = change >= 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button */}
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 border-none shadow-none p-1 cursor-pointer">
          <ArrowLeft className="h-4 w-4 " />
          Back
        </Button>

        {/* Stock Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
              <span className="text-lg text-gray-600">{stock.name}</span>
            </div>
            {stock.description && (
              <p className="text-sm text-gray-600">{stock.description}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleWatchlistMutation.mutate()}
            className={`transition-colors ${isInWatchlist ? 'text-green-600 border-green-200 bg-green-50' : 'text-gray-400'}`}
          >
            {isInWatchlist ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
          </Button>
        </div>

        {/* Price and Metrics */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-gray-900">₹{currentPrice.toFixed(2)}</p>
                <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}₹{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Market Cap</p>
                <p className="text-lg font-semibold text-gray-900">{stock.marketCap}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">P/E Ratio</p>
                <p className="text-lg font-semibold text-gray-900">{stock.peRatio ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Change</p>
                <p className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}₹{change.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart and Trading Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 border-none shadow-none">
              <CardContent className="p-6">
                <StockPriceChart data={priceHistory ?? []} symbol={stock.symbol} />
              </CardContent>
            </Card>
          </div>
          <div>
            <StockOrderPanel
              holding={stock}
              balance={cash}
              change={changePercent}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

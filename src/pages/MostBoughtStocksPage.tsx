import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoadingState } from '@/components/ui/LoadingState';
import { StockCard } from '@/components/domain/stocks/StockCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { stocksApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { subscribeToStocks, unsubscribeFromStocks } from '@/lib/socket';

export function MostBoughtStocksPage() {
    const navigate = useNavigate();

    const { data: mostBoughtStocks, isLoading } = useQuery({
        queryKey: queryKeys.stocks.mostBought(),
        queryFn: () => stocksApi.fetchMostBoughtStocks(),
    });

    // Subscribe to most bought stocks for real-time price updates
    useEffect(() => {
        if (mostBoughtStocks && mostBoughtStocks.length > 0) {
            const symbols = mostBoughtStocks.map(s => s.symbol);
            subscribeToStocks(symbols);

            return () => {
                unsubscribeFromStocks(symbols);
            };
        }
    }, [mostBoughtStocks]);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="mb-6 border-none shadow-none p-1 cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Most Bought Stocks</h1>
                    <p className="text-sm text-gray-600">Explore the most popular stocks on Groww</p>
                </div>

                {/* Content */}
                {isLoading ? (
                    <LoadingState rows={3} type="card" />
                ) : mostBoughtStocks && mostBoughtStocks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mostBoughtStocks.map((stock) => (
                            <StockCard key={stock.symbol} stock={stock} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-600">No data available</p>
                    </div>
                )}
            </div>
        </div>
    );
}

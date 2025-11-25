import { useState, useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/ui/LoadingState';
import { PortfolioValueChart } from '@/components/charts/PortfolioValueChart';
import { HoldingsTable } from '@/components/domain/portfolio/HoldingsTable';
import { PortfolioSummaryCard } from '@/components/domain/portfolio/PortfolioSummaryCard';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { StockSelectionPlaceholder } from '@/components/domain/portfolio/StockSelectionPlaceholder';
import { StockOrderPanel } from '@/components/domain/portfolio/StockOrderPanel';
import { subscribeToStocks, unsubscribeFromStocks } from '@/lib/socket';
import { useAppSelector } from '@/lib/hooks';
import type { Holding } from '@/lib/types';

export function Portfolio() {
    const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
    const { data: portfolio, isLoading } = useQuery({
        queryKey: queryKeys.portfolio.summary(),
        queryFn: () => portfolioApi.fetchPortfolioSummary(),
    });

    // Get real-time prices from Redux
    const marketPrices = useAppSelector((state) => state.market.prices);

    // Subscribe to all holdings for real-time updates
    useEffect(() => {
        if (portfolio?.holdings && portfolio.holdings.length > 0) {
            const symbols = portfolio.holdings.map(h => h.symbol);
            subscribeToStocks(symbols);

            return () => {
                unsubscribeFromStocks(symbols);
            };
        }
    }, [portfolio?.holdings]);

    // Calculate real-time portfolio values
    const realTimeValues = useMemo(() => {
        if (!portfolio?.holdings) return null;

        let totalCurrentValue = 0;
        let totalInvestedValue = 0;

        portfolio.holdings.forEach(holding => {
            const realtimePrice = marketPrices[holding.symbol]?.price ?? holding.currentPrice;
            const currentValue = realtimePrice * holding.quantity;

            totalCurrentValue += currentValue;
            totalInvestedValue += holding.investedValue;
        });

        const totalProfitLoss = totalCurrentValue - totalInvestedValue;
        const totalProfitLossPercent = (totalProfitLoss / totalInvestedValue) * 100;

        return {
            totalCurrentValue,
            totalProfitLoss,
            totalProfitLossPercent,
        };
    }, [portfolio?.holdings, marketPrices]);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-xl font-medium text-gray-700 mb-2">Holdings ({portfolio?.holdings.length || 0})</h1>
                    <Button variant="outline" size="icon" className="h-9 w-9 text-blue-600 border-blue-600 hover:bg-blue-50">
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>

                {isLoading ? (
                    <LoadingState rows={4} type="card" />
                ) : portfolio ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Portfolio Summary & Holdings */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Investment Summary */}
                            <PortfolioSummaryCard
                                currentValue={realTimeValues?.totalCurrentValue ?? portfolio.totalCurrentValue}
                                oneDayReturns={0} // API does not provide 1D returns yet
                                oneDayReturnsPercent={0}
                                totalReturns={realTimeValues?.totalProfitLoss ?? portfolio.totalProfitLoss}
                                totalReturnsPercent={realTimeValues?.totalProfitLossPercent ?? portfolio.totalProfitLossPercent}
                                invested={portfolio.totalInvestedValue}
                            />

                            {/* Portfolio Chart */}
                            {portfolio.valueHistory && portfolio.valueHistory.length > 0 && (
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
                            )}

                            {/* Holdings Table */}

                            <HoldingsTable
                                holdings={portfolio.holdings}
                                onSelectHolding={setSelectedHolding}
                            />

                        </div>

                        {/* Right Column: Order Panel / Placeholder */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6">
                                {selectedHolding ? (
                                    <StockOrderPanel
                                        holding={selectedHolding}
                                        onClose={() => setSelectedHolding(null)}
                                        balance={portfolio.availableBalance}
                                    />
                                ) : (
                                    <StockSelectionPlaceholder balance={portfolio.availableBalance} />
                                )}
                            </div>
                        </div>
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

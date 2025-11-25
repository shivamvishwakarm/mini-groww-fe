import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { InvestmentSummaryCard } from "../domain/portfolio/InvestmentSummaryCard";
import { ProductToolCard } from "../domain/products/ProductToolCard";
import { MarketMoverRow } from "../domain/market/MarketMoverRow";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { portfolioApi, stocksApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { StockCard } from "../domain/stocks/StockCard";



import {
    productsTools,
} from '@/lib/mockMarketData';
import { LoadingState } from "../ui/LoadingState";
import { useState, useEffect, useMemo } from "react";
import { subscribeToStocks, unsubscribeFromStocks } from '@/lib/socket';
import { useAppSelector } from '@/lib/hooks';

export function Explore() {
    const navigate = useNavigate();
    const [marketMoverFilter, setMarketMoverFilter] = useState('gainers');

    const { data: portfolio, isLoading } = useQuery({
        queryKey: queryKeys.portfolio.summary(),
        queryFn: () => portfolioApi.fetchPortfolioSummary(),
    });

    const { data: mostBoughtStocks, isLoading: isMostBoughtLoading } = useQuery({
        queryKey: queryKeys.stocks.mostBought(),
        queryFn: () => stocksApi.fetchMostBoughtStocks(),
    });

    // Fetch market movers based on active filter
    const { data: gainers, isLoading: isGainersLoading } = useQuery({
        queryKey: queryKeys.stocks.gainers(),
        queryFn: () => stocksApi.fetchGainers(),
        enabled: marketMoverFilter === 'gainers',
    });

    const { data: losers, isLoading: isLosersLoading } = useQuery({
        queryKey: queryKeys.stocks.losers(),
        queryFn: () => stocksApi.fetchLosers(),
        enabled: marketMoverFilter === 'losers',
    });

    const { data: volumeShockers, isLoading: isVolumeShockersLoading } = useQuery({
        queryKey: queryKeys.stocks.volumeShockers(),
        queryFn: () => stocksApi.fetchVolumeShockers(),
        enabled: marketMoverFilter === 'volume',
    });

    // Determine which data to show based on filter
    const marketMovers = useMemo(() => {
        if (marketMoverFilter === 'gainers') return gainers || [];
        if (marketMoverFilter === 'losers') return losers || [];
        if (marketMoverFilter === 'volume') return volumeShockers || [];
        return [];
    }, [marketMoverFilter, gainers, losers, volumeShockers]);

    const isMarketMoversLoading = isGainersLoading || isLosersLoading || isVolumeShockersLoading;

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

    // Subscribe to market movers for real-time price updates
    useEffect(() => {
        if (marketMovers && marketMovers.length > 0) {
            const symbols = marketMovers.map(s => s.symbol);
            subscribeToStocks(symbols);

            return () => {
                unsubscribeFromStocks(symbols);
            };
        }
    }, [marketMovers]);

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
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Market Data (span 2) */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Most Bought Stocks */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Most bought stocks on Groww</h2>
                        </div>

                        {isMostBoughtLoading ? (
                            <LoadingState rows={1} type="card" />
                        ) : mostBoughtStocks && mostBoughtStocks.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {mostBoughtStocks.slice(0, 4).map((stock) => (
                                        <StockCard key={stock.symbol} stock={stock} />
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate('/most-bought-stocks')}
                                    className="flex items-center text-sm text-green-600 font-medium mt-4 hover:text-green-700 transition-colors cursor-pointer"
                                >
                                    See more <ChevronRight className="h-4 w-4 ml-1" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No data available
                            </div>
                        )}
                    </section>

                    {/* Top Market Movers */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Top market movers</h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                            <button
                                onClick={() => setMarketMoverFilter('gainers')}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${marketMoverFilter === 'gainers'
                                    ? 'bg-gray-100 text-gray-900 border border-gray-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Gainers
                            </button>
                            <button
                                onClick={() => setMarketMoverFilter('losers')}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${marketMoverFilter === 'losers'
                                    ? 'bg-gray-100 text-gray-900 border border-gray-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Losers
                            </button>
                            <button
                                onClick={() => setMarketMoverFilter('volume')}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${marketMoverFilter === 'volume'
                                    ? 'bg-gray-100 text-gray-900 border border-gray-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Volume shockers
                            </button>
                            <button
                                onClick={() => setMarketMoverFilter('nifty500')}
                                className={`px-5 py-2 text-sm font-medium rounded-full border border-gray-200 transition-all ${marketMoverFilter === 'nifty500'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                NIFTY 500 <span className="ml-1 text-xs">▼</span>
                            </button>
                        </div>

                        <Card className="border border-gray-200 shadow-sm overflow-hidden">
                            <CardContent className="p-0">
                                {/* Table Header */}
                                <div className="flex items-center justify-between px-6 py-3 bg-gray-50/50 border-b border-gray-100">
                                    <div className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Company</div>
                                    <div className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Market price (1D)</div>
                                    <div className="text-right min-w-[140px] text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</div>
                                </div>
                                {/* Market Movers List */}
                                {isMarketMoversLoading ? (
                                    <div className="p-6">
                                        <LoadingState rows={5} type="card" />
                                    </div>
                                ) : marketMovers.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {marketMovers.slice(0, 5).map((mover) => (
                                            <MarketMoverRow key={mover.symbol} mover={mover} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        No data available
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Right Column - User & Products (span 1) */}
                <div className="space-y-12">
                    {isLoading ? (
                        <LoadingState rows={4} type="card" />
                    ) : portfolio ? (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Your investments</h2>
                            </div>
                            <InvestmentSummaryCard
                                currentValue={realTimeValues?.totalCurrentValue ?? portfolio.totalCurrentValue}
                                oneDayReturns={0}
                                oneDayReturnsPercent={0}
                                totalReturns={realTimeValues?.totalProfitLoss ?? portfolio.totalProfitLoss}
                                totalReturnsPercent={realTimeValues?.totalProfitLossPercent ?? portfolio.totalProfitLossPercent}
                                invested={portfolio.totalInvestedValue}
                            />
                        </section>
                    ) : null}

                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Products & Tools</h2>
                        </div>
                        <Card className="border border-gray-200 shadow-sm overflow-hidden">
                            <CardContent className="p-0">
                                {productsTools.map((product) => (
                                    <ProductToolCard
                                        key={product.id}
                                        product={product}
                                        variant="row"
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
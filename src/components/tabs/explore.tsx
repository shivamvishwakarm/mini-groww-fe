import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { InvestmentSummaryCard } from "../domain/portfolio/InvestmentSummaryCard";
import { ProductToolCard } from "../domain/products/ProductToolCard";
import { MarketMoverRow } from "../domain/market/MarketMoverRow";
import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { StockCard } from "../domain/stocks/StockCard";



import {
    popularStocks,
    marketMovers,
    productsTools,
} from '@/lib/mockMarketData';
import { LoadingState } from "../ui/LoadingState";
import { useState } from "react";
export function Explore() {
    const [marketMoverFilter, setMarketMoverFilter] = useState('gainers');

    const { data: portfolio, isLoading } = useQuery({
        queryKey: queryKeys.portfolio.summary(),
        queryFn: () => portfolioApi.fetchPortfolioSummary(),
    });
    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Most bought stocks */}
                <div className="lg:col-span-2">
                    <Card className="border border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Most bought stocks on Groww
                            </CardTitle>
                            <button className="flex items-center text-sm text-primary hover:text-primary/80 font-medium">
                                See more <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {popularStocks.map((stock) => (
                                    <StockCard key={stock.symbol} stock={stock} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Investment Summary & Products */}
                {isLoading ? (
                    <LoadingState rows={4} type="card" />
                ) : portfolio ? (
                    <div className="space-y-6">
                        {/* Investment Summary */}
                        <InvestmentSummaryCard
                            currentValue={portfolio.totalCurrentValue}
                            oneDayReturns={0} // API does not provide 1D returns yet
                            oneDayReturnsPercent={0}
                            totalReturns={portfolio.totalProfitLoss}
                            totalReturnsPercent={portfolio.totalProfitLossPercent}
                            invested={portfolio.totalInvestedValue}
                        />

                        {/* Products & Tools */}
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold text-gray-900">
                                    Products & Tools
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {productsTools.map((product) => (
                                    <ProductToolCard key={product.id} product={product} />
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                ) : null}
            </div>

            {/* Top Market Movers */}
            <div className="mt-6">
                <Card className="border border-gray-200">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold text-gray-900">
                            Top market movers
                        </CardTitle>
                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 mt-3">
                            <button
                                onClick={() => setMarketMoverFilter('gainers')}
                                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${marketMoverFilter === 'gainers'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Gainers
                            </button>
                            <button
                                onClick={() => setMarketMoverFilter('losers')}
                                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${marketMoverFilter === 'losers'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Losers
                            </button>
                            <button
                                onClick={() => setMarketMoverFilter('volume')}
                                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${marketMoverFilter === 'volume'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Volume shockers
                            </button>
                            <button
                                onClick={() => setMarketMoverFilter('nifty500')}
                                className={`px-4 py-1.5 text-sm rounded-full border border-gray-300 transition-colors ${marketMoverFilter === 'nifty500'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                NIFTY 500 <span className="ml-1">▼</span>
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Table Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-b border-gray-100">
                            <div className="flex-1 text-xs font-medium text-gray-600">Company</div>
                            <div className="px-4 text-xs font-medium text-gray-600">Market price (1D)</div>
                            <div className="text-right min-w-[140px] text-xs font-medium text-gray-600">Volume</div>
                        </div>
                        {/* Market Movers List */}
                        {marketMovers.slice(0, 5).map((mover) => (
                            <MarketMoverRow key={mover.symbol} mover={mover} />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
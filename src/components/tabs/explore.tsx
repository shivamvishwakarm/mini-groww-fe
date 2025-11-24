import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
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
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Market Data (span 2) */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Most Bought Stocks */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Most bought stocks on Groww</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {popularStocks.map((stock) => (
                                <StockCard key={stock.symbol} stock={stock} />
                            ))}
                        </div>

                        <button className="flex items-center text-sm text-green-600 font-medium mt-4 hover:text-green-700 transition-colors">
                            See more <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
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
                                <div className="divide-y divide-gray-100">
                                    {marketMovers.slice(0, 5).map((mover) => (
                                        <MarketMoverRow key={mover.symbol} mover={mover} />
                                    ))}
                                </div>
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
                                currentValue={portfolio.totalCurrentValue}
                                oneDayReturns={0}
                                oneDayReturnsPercent={0}
                                totalReturns={portfolio.totalProfitLoss}
                                totalReturnsPercent={portfolio.totalProfitLossPercent}
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
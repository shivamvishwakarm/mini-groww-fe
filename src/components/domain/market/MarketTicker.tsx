import { useAppSelector } from '@/lib/hooks';
import { Globe } from 'lucide-react';
import type { Index } from '@/lib/types';

interface MarketTickerProps {
    indices: Index[];
}

export function MarketTicker({ indices }: MarketTickerProps) {
    // Get real-time prices from Redux (if indices are also tracked via WebSocket)
    const marketPrices = useAppSelector((state) => state.market.prices);

    return (
        <div className="md:px-24 px-8 bg-white border-b border-gray-200 overflow-hidden flex gap-2">
            <div className="flex items-center gap-8 px-6 py-3 overflow-x-auto scrollbar-hide">
                {indices.map((index) => {
                    // Use real-time data if available, otherwise use API data
                    const realtimeData = marketPrices[index.symbol];
                    const currentValue = realtimeData?.price ?? index.currentValue;
                    const changePercent = realtimeData?.changePercent ?? index.changePercent;
                    const change = realtimeData ? (currentValue - index.previousClose) : index.change;

                    return (
                        <div key={index.symbol} className="flex items-center gap-2 whitespace-nowrap">
                            <span className="font-semibold text-sm text-gray-900">{index.name}</span>
                            <span className="text-sm text-gray-700">{currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            <span
                                className={`text-xs font-medium ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}
                            >
                                {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
                            </span>
                        </div>
                    );
                })}
            </div>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors ">
                <Globe className="h-8 w-8  border px-1 m-1 border rounded-md text-gray-500" />
            </button>
        </div>
    );
}

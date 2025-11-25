import { useAppSelector } from '@/lib/hooks';
import type { Stock } from '@/lib/types';

interface MarketMoverRowProps {
    mover: Stock;
}

export function MarketMoverRow({ mover }: MarketMoverRowProps) {
    // Get real-time price from Redux
    const realtimeData = useAppSelector((state) => state.market.prices[mover.symbol]);
    const currentPrice = realtimeData?.price ?? mover.currentPrice;
    const changePercent = realtimeData?.changePercent ?? 0;

    const change = currentPrice - (mover.previousClose || mover.currentPrice);
    const isPositive = changePercent >= 0;

    return (
        <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
            {/* Company info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {mover.symbol.substring(0, 2)}
                </div>
                <div className="min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">{mover.name}</div>
                </div>
            </div>

            {/* Price and change */}
            <div className="text-right min-w-[200px]">
                <div className="font-semibold text-sm text-gray-900">₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                <div className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                </div>
            </div>

            {/* Volume placeholder */}
            <div className="text-right min-w-[100px] text-sm text-gray-600 ml-4">
                -
            </div>
        </div>
    );
}

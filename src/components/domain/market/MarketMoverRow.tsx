import type { MarketMover } from '@/lib/mockMarketData';

interface MarketMoverRowProps {
    mover: MarketMover;
}

export function MarketMoverRow({ mover }: MarketMoverRowProps) {
    const isPositive = mover.changePercent >= 0;

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

            {/* Mini chart */}
            <div className="flex items-center gap-4 px-4">
                <div className="w-24 h-8 flex items-end gap-0.5">
                    {mover.chartData.map((value, index) => {
                        const max = Math.max(...mover.chartData);
                        const min = Math.min(...mover.chartData);
                        const height = ((value - min) / (max - min)) * 100;
                        return (
                            <div
                                key={index}
                                className={`flex-1 rounded-t ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}
                                style={{ height: `${Math.max(height, 10)}%` }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Price and change */}
            <div className="text-right min-w-[140px]">
                <div className="font-semibold text-sm text-gray-900">₹{mover.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                <div className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{mover.change.toFixed(2)} ({isPositive ? '+' : ''}{mover.changePercent.toFixed(2)}%)
                </div>
            </div>

            {/* Volume */}
            <div className="text-right min-w-[100px] text-sm text-gray-600 ml-4">
                {(mover.volume / 1000).toFixed(0)}K
            </div>
        </div>
    );
}

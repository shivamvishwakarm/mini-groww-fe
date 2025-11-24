import type { MarketIndex } from '@/lib/mockMarketData';
import { Globe } from 'lucide-react';

interface MarketTickerProps {
    indices: MarketIndex[];
}

export function MarketTicker({ indices }: MarketTickerProps) {
    return (
        <div className="md:px-24 px-8 bg-white border-b border-gray-200 overflow-hidden flex gap-2">
            <div className="flex items-center gap-8 px-6 py-3 overflow-x-auto scrollbar-hide">
                {indices.map((index) => (
                    <div key={index.name} className="flex items-center gap-2 whitespace-nowrap">
                        <span className="font-semibold text-sm text-gray-900">{index.name}</span>
                        <span className="text-sm text-gray-700">{index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        <span
                            className={`text-xs font-medium ${index.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                        </span>
                    </div>
                ))}

            </div>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors ">
                <Globe className="h-8 w-8  border px-1 m-1 border rounded-md text-gray-500" />
            </button>
        </div>
    );
}

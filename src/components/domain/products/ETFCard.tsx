import { Card } from '@/components/ui/card';
import type { ETF } from '@/lib/mockMarketData';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface ETFCardProps {
    etf: ETF;
}

export function ETFCard({ etf }: ETFCardProps) {
    const isPositive = etf.returns1Y >= 0;

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group">
            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 mr-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 mb-2 inline-block">
                            {etf.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                            {etf.name}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-0.5">NAV</p>
                        <p className="text-sm font-bold text-gray-900">₹{etf.nav.toFixed(2)}</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">1Y Returns</span>
                        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                            {etf.returns1Y}%
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">3Y Returns</span>
                        <span className="text-sm font-medium text-gray-700">{etf.returns3Y}%</span>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-1">
                        <PieChart className="h-3.5 w-3.5" />
                        <span>Exp. Ratio: {etf.expenseRatio}%</span>
                    </div>
                    <span>AUM: {etf.aum}</span>
                </div>
            </div>
        </Card>
    );
}

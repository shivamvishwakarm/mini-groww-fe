import { Card, CardContent } from '@/components/ui/card';

interface InvestmentSummaryCardProps {
    currentValue: number;
    oneDayReturns: number;
    oneDayReturnsPercent: number;
    totalReturns: number;
    totalReturnsPercent: number;
    invested: number;
}

export function InvestmentSummaryCard({
    currentValue,
    oneDayReturns,
    oneDayReturnsPercent,
    totalReturns,
    totalReturnsPercent,
    invested,
}: InvestmentSummaryCardProps) {
    return (
        <Card className="border border-gray-200">
            <CardContent className="space-y-3 pt-6">
                <div>
                    <div className="text-sm text-gray-600">Current</div>
                    <div className="text-2xl font-bold text-gray-900">₹{currentValue.toLocaleString('en-IN')}</div>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <div className="text-sm text-gray-600">1D returns</div>
                    <div className={`text-sm font-semibold ${oneDayReturnsPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {oneDayReturnsPercent >= 0 ? '+' : ''}₹{oneDayReturns.toLocaleString('en-IN')} ({oneDayReturnsPercent >= 0 ? '+' : ''}{oneDayReturnsPercent.toFixed(2)}%)
                    </div>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <div className="text-sm text-gray-600">Total returns</div>
                    <div className={`text-sm font-semibold ${totalReturnsPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {totalReturnsPercent >= 0 ? '+' : ''}₹{totalReturns.toLocaleString('en-IN')} ({totalReturnsPercent >= 0 ? '+' : ''}{totalReturnsPercent.toFixed(2)}%)
                    </div>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <div className="text-sm text-gray-600">Invested</div>
                    <div className="text-sm font-semibold text-gray-900">₹{invested.toLocaleString('en-IN')}</div>
                </div>
            </CardContent>
        </Card>
    );
}

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, MoreVertical } from 'lucide-react';

interface PortfolioSummaryCardProps {
    currentValue: number;
    oneDayReturns: number;
    oneDayReturnsPercent: number;
    totalReturns: number;
    totalReturnsPercent: number;
    invested: number;
}

export function PortfolioSummaryCard({
    currentValue,
    oneDayReturns,
    oneDayReturnsPercent,
    totalReturns,
    totalReturnsPercent,
    invested,
}: PortfolioSummaryCardProps) {
    return (
        <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Current value</p>
                        <h2 className="text-3xl font-semibold text-gray-900">
                            ₹{currentValue.toLocaleString('en-IN')}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-700">
                            <BarChart2 className="h-4 w-4" />
                            Analyse
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9 text-gray-700">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-dashed border-gray-200">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Invested value</p>
                        <p className="text-lg font-medium text-gray-900">
                            ₹{invested.toLocaleString('en-IN')}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">1D returns</p>
                        <p className={`text-lg font-medium ${oneDayReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {oneDayReturns >= 0 ? '+' : ''}₹{Math.abs(oneDayReturns).toLocaleString('en-IN')} ({oneDayReturnsPercent.toFixed(2)}%)
                        </p>
                    </div>

                    <div className="md:text-right">
                        <p className="text-sm text-gray-500 mb-1">Total returns</p>
                        <p className={`text-lg font-medium ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {totalReturns >= 0 ? '+' : ''}₹{Math.abs(totalReturns).toLocaleString('en-IN')} ({totalReturnsPercent.toFixed(2)}%)
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

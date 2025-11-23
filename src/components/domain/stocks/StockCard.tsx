import { Card } from '@/components/ui/card';
import type { Stock } from '@/lib/mockMarketData';
import { useNavigate } from 'react-router-dom';

interface StockCardProps {
    stock: Stock;
}

export function StockCard({ stock }: StockCardProps) {
    const navigate = useNavigate();
    const isPositive = stock.changePercent >= 0;

    const handleClick = () => {
        navigate(`/stocks/${stock.symbol}`);
    };

    return (
        <Card
            className="p-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
            onClick={handleClick}
        >
            <div className="flex items-start gap-3">
                {/* Logo placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {stock.symbol.substring(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 truncate">{stock.name}</h3>
                    <div className="mt-2">
                        <div className="text-lg font-semibold text-gray-900">
                            ₹{stock.price.toFixed(2)}
                        </div>
                        <div className={`text-xs font-medium mt-0.5 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

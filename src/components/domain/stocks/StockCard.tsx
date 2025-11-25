import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/lib/hooks';
import type { Stock } from '@/lib/types';

interface StockCardProps {
    stock: Stock;
}

export function StockCard({ stock }: StockCardProps) {
    const navigate = useNavigate();

    // Get real-time price from Redux
    const realtimeData = useAppSelector((state) => state.market.prices[stock.symbol]);
    const currentPrice = realtimeData?.price ?? stock.currentPrice;
    const changePercent = realtimeData?.changePercent ?? 0;

    const isPositive = changePercent >= 0;

    const handleClick = () => {
        navigate(`/stocks/${stock.symbol}`);
    };

    return (
        <Card
            className="p-5 cursor-pointer hover:bg-slate-50 transition-all duration-200 border border-gray-100 rounded-xl bg-white min-w-[50px]"
            onClick={handleClick}
        >
            <div className="flex flex-col items-start h-full">
                {/* Logo placeholder */}
                <div className="w-12 h-12 rounded-xl border border-gray-100 bg-white flex items-center justify-center mb-4 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                        {stock.symbol.substring(0, 1)}
                    </div>
                </div>

                <h3 className=" text-sm text-gray-700 mb-8 line-clamp-2">{stock.name}</h3>

                <div className="mt-auto">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                        ₹{currentPrice.toFixed(2)}
                    </div>
                    <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                    </div>
                </div>
            </div>
        </Card>
    );
}

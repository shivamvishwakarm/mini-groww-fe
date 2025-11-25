import { ArrowUp, ArrowDown } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { useAppSelector } from '@/lib/hooks';
import type { Stock } from '@/lib/types';

interface StockRowProps {
  stock: Stock;
  onClick?: () => void;
}

export function StockRow({ stock, onClick }: StockRowProps) {
  // Get real-time price from Redux, fallback to stock.currentPrice
  const realtimeData = useAppSelector((state) => state.market.prices[stock.symbol]);
  const currentPrice = realtimeData?.price ?? stock.currentPrice;
  const changePercent = realtimeData?.changePercent ?? ((currentPrice - stock.previousClose) / stock.previousClose) * 100;

  const change = currentPrice - stock.previousClose;
  const isPositive = change >= 0;

  const formatMarketCap = (val: number) => {
    if (val >= 1e12) return `₹${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `₹${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `₹${(val / 1e6).toFixed(2)}M`;
    return `₹${val.toLocaleString()}`;
  };

  return (
    <TableRow onClick={onClick} className={onClick ? 'cursor-pointer hover:bg-muted' : ''}>
      <TableCell className="font-medium">{stock.symbol}</TableCell>
      <TableCell>{stock.name}</TableCell>
      <TableCell className="text-right">₹{currentPrice.toFixed(2)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">{formatMarketCap(stock.marketCap)}</TableCell>
    </TableRow>
  );
}

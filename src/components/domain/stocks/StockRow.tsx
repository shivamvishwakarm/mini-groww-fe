import { ArrowUp, ArrowDown } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Stock } from '@/lib/types';

interface StockRowProps {
  stock: Stock;
  onClick?: () => void;
}

export function StockRow({ stock, onClick }: StockRowProps) {
  const change = stock.currentPrice - stock.previousClose;
  const changePercent = (change / stock.previousClose) * 100;
  const isPositive = change >= 0;

  const formatMarketCap = (val: number) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  return (
    <TableRow onClick={onClick} className={onClick ? 'cursor-pointer hover:bg-muted' : ''}>
      <TableCell className="font-medium">{stock.symbol}</TableCell>
      <TableCell>{stock.name}</TableCell>
      <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">{formatMarketCap(stock.marketCap)}</TableCell>
    </TableRow>
  );
}

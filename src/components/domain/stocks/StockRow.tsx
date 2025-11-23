import { ArrowUp, ArrowDown } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Stock } from '@/lib/types';

interface StockRowProps {
  stock: Stock;
  onClick?: () => void;
}

export function StockRow({ stock, onClick }: StockRowProps) {
  const isPositive = stock.change >= 0;

  return (
    <TableRow onClick={onClick} className={onClick ? 'cursor-pointer hover:bg-muted' : ''}>
      <TableCell className="font-medium">{stock.symbol}</TableCell>
      <TableCell>{stock.name}</TableCell>
      <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">{stock.marketCap}</TableCell>
      <TableCell className="text-right">{(stock.volume / 1000000).toFixed(1)}M</TableCell>
    </TableRow>
  );
}

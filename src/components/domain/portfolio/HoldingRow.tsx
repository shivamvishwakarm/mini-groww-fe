import { ArrowUp, ArrowDown } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Holding } from '@/lib/types';

interface HoldingRowProps {
  holding: Holding;
  onClick?: () => void;
}

export function HoldingRow({ holding, onClick }: HoldingRowProps) {
  const isPositive = holding.gain >= 0;

  return (
    <TableRow onClick={onClick} className={onClick ? 'cursor-pointer hover:bg-muted' : ''}>
      <TableCell className="font-medium">{holding.symbol}</TableCell>
      <TableCell>{holding.name}</TableCell>
      <TableCell className="text-right">{holding.quantity}</TableCell>
      <TableCell className="text-right">${holding.averagePrice.toFixed(2)}</TableCell>
      <TableCell className="text-right">${holding.currentPrice.toFixed(2)}</TableCell>
      <TableCell className="text-right">${holding.currentValue.toLocaleString()}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}${holding.gain.toFixed(2)} ({holding.gainPercent.toFixed(2)}%)
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}

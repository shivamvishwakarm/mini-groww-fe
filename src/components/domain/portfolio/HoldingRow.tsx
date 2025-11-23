import { ArrowUp, ArrowDown } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Holding } from '@/lib/types';

interface HoldingRowProps {
  holding: Holding;
  onClick?: () => void;
}

export function HoldingRow({ holding, onClick }: HoldingRowProps) {
  const isPositive = holding.profitLoss >= 0;

  return (
    <TableRow onClick={onClick} className={onClick ? 'cursor-pointer hover:bg-muted' : ''}>
      <TableCell className="font-medium">{holding.symbol}</TableCell>
      <TableCell className="text-right">{holding.quantity}</TableCell>
      <TableCell className="text-right">${holding.avgBuyPrice.toFixed(2)}</TableCell>
      <TableCell className="text-right">${holding.currentPrice.toFixed(2)}</TableCell>
      <TableCell className="text-right">${holding.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          {isPositive ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}${holding.profitLoss.toFixed(2)} ({holding.profitLossPercent.toFixed(2)}%)
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}

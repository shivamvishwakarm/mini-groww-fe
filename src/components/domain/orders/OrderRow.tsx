import { ArrowUp, ArrowDown } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Order } from '@/lib/types';

interface OrderRowProps {
  order: Order;
}

export function OrderRow({ order }: OrderRowProps) {
  const isBuy = order.side === 'BUY';
  const totalAmount = order.price * order.quantity;

  return (
    <TableRow>
      <TableCell className="font-medium">{order.symbol}</TableCell>
      <TableCell>
        <div className="flex items-center">
          {isBuy ? (
            <ArrowDown className="h-4 w-4 text-red-500 mr-2" />
          ) : (
            <ArrowUp className="h-4 w-4 text-green-500 mr-2" />
          )}
          <span className={isBuy ? 'text-red-500' : 'text-green-500'}>
            {isBuy ? 'BUY' : 'SELL'}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">{order.quantity}</TableCell>
      <TableCell className="text-right">${order.price.toFixed(2)}</TableCell>
      <TableCell className="text-right">${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
      <TableCell className="text-right text-xs text-muted-foreground">
        {new Date(order.createdAt).toLocaleString()}
      </TableCell>
    </TableRow>
  );
}

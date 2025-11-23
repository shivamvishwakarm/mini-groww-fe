import { ArrowUp, ArrowDown, CheckCircle, Clock } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Order } from '@/lib/types';

interface OrderRowProps {
  order: Order;
}

export function OrderRow({ order }: OrderRowProps) {
  const isBuy = order.side === 'BUY';
  const isFilled = order.status === 'FILLED';

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
      <TableCell className="text-right">${order.totalAmount.toLocaleString()}</TableCell>
      <TableCell>
        <div className="flex items-center">
          {isFilled ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <Clock className="h-4 w-4 text-yellow-500 mr-2" />
          )}
          <span className={isFilled ? 'text-green-500' : 'text-yellow-500'}>
            {order.status}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right text-xs text-muted-foreground">
        {new Date(order.createdAt).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}

import { TableCell, TableRow } from '@/components/ui/table';
import type { Order } from '@/lib/types';

interface OrderRowProps {
  order: Order;
}

export function OrderRow({ order }: OrderRowProps) {
  const isSell = order.side === 'SELL';
  const totalAmount = order.price * order.quantity;

  return (
    <TableRow>
      <TableCell className="font-medium">{order.symbol}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className={isSell ? 'text-red-500' : 'text-green-500'}>
            {isSell ? 'SELL' : 'BUY'}
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

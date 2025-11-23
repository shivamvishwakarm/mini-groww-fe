import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { Order } from '@/lib/types';

interface TradeSummaryCardProps {
  order: Order;
}

export function TradeSummaryCard({ order }: TradeSummaryCardProps) {
  const isBuy = order.side === 'BUY';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isBuy ? (
            <>
              <ArrowDown className="h-5 w-5 text-red-500" />
              Buy Order
            </>
          ) : (
            <>
              <ArrowUp className="h-5 w-5 text-green-500" />
              Sell Order
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Symbol</p>
            <p className="text-lg font-semibold">{order.symbol}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-lg font-semibold">{order.status}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="text-lg font-semibold">{order.quantity} shares</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">${order.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold">${order.totalAmount.toLocaleString()}</p>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Order ID: {order.id}</p>
          <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}

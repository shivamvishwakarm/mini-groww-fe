import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingState } from '@/components/ui/LoadingState';
import { OrdersTable } from '@/components/domain/orders/OrdersTable';
import { ordersApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';

export function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: queryKeys.orders.list(),
    queryFn: () => ordersApi.fetchOrders(),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="View your trading history"
      />

      {isLoading ? (
        <LoadingState rows={10} columns={7} />
      ) : orders && orders.length > 0 ? (
        <OrdersTable orders={orders} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No orders yet</p>
        </div>
      )}
    </div>
  );
}

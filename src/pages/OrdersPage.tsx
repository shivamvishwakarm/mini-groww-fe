import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/ui/LoadingState';
import { OrdersTable } from '@/components/domain/orders/OrdersTable';
import { ordersApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { ShoppingCart } from 'lucide-react';

export function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: orders, isLoading } = useQuery({
    queryKey: queryKeys.orders.list(),
    queryFn: () => ordersApi.fetchOrders(),
  });

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-sm text-gray-600">View your trading history</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${activeFilter === filter.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingState rows={10} columns={7} />
        ) : orders && orders.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <OrdersTable orders={orders} />
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-900 font-medium mb-1">No orders yet</p>
                <p className="text-sm text-gray-600">Your trading history will appear here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

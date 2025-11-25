import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingState } from '../ui/LoadingState';
import { OrdersTable } from '../domain/orders/OrdersTable';
import { ordersApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react';

export function Orders() {
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

    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        if (activeFilter === 'all') return orders;
        return [];
    }, [orders, activeFilter]);

    const getEmptyStateContent = () => {
        switch (activeFilter) {
            case 'pending':
                return {
                    icon: <Clock className="h-8 w-8 text-orange-400" />,
                    title: "No pending orders",
                    description: "You don't have any open orders at the moment"
                };
            case 'completed':
                return {
                    icon: <CheckCircle className="h-8 w-8 text-green-400" />,
                    title: "No completed orders",
                    description: "Your executed trades will show up here"
                };
            case 'cancelled':
                return {
                    icon: <XCircle className="h-8 w-8 text-red-400" />,
                    title: "No cancelled orders",
                    description: "Cancelled orders will be listed here"
                };
            default:
                return {
                    icon: <ShoppingCart className="h-8 w-8 text-gray-400" />,
                    title: "No orders yet",
                    description: "Your trading history will appear here"
                };
        }
    };

    const emptyState = getEmptyStateContent();

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
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
            ) : filteredOrders.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200">
                    <OrdersTable orders={filteredOrders} />
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                            {emptyState.icon}
                        </div>
                        <div>
                            <p className="text-gray-900 font-medium mb-1">{emptyState.title}</p>
                            <p className="text-sm text-gray-600">{emptyState.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
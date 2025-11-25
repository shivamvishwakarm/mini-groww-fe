import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '@/components/ui/LoadingState';
import { StockTable } from '@/components/domain/stocks/StockTable';
import { stocksApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { Search } from 'lucide-react';
import { subscribeToStocks, unsubscribeFromStocks } from '@/lib/socket';

export function StocksPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: stocks, isLoading } = useQuery({
    queryKey: queryKeys.stocks.list(),
    queryFn: () => stocksApi.fetchStocks(),
  });

  // Subscribe to all stocks for real-time price updates
  useEffect(() => {
    if (stocks && stocks.length > 0) {
      const symbols = stocks.map(stock => stock.symbol);
      subscribeToStocks(symbols);

      return () => {
        unsubscribeFromStocks(symbols);
      };
    }
  }, [stocks]);

  const filteredStocks = useMemo(() => {
    if (!stocks) return [];
    const search = searchTerm.toLowerCase();
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(search) ||
        stock.name.toLowerCase().includes(search)
    );
  }, [stocks, searchTerm]);

  const filters = [
    { id: 'all', label: 'All Stocks' },
    { id: 'trending', label: 'Trending' },
    { id: 'gainers', label: 'Gainers' },
    { id: 'losers', label: 'Losers' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Stocks</h1>
          <p className="text-sm text-gray-600">Browse and search available stocks</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 max-w-md">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by symbol or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm flex-1 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Filter Tabs */}
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
          <LoadingState rows={10} columns={6} />
        ) : filteredStocks.length > 0 ? (
          <StockTable
            stocks={filteredStocks}
            onSelectStock={(stock) => navigate(`/stocks/${stock.symbol}`)}
          />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">No stocks found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

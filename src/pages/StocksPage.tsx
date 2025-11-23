import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/input';
import { LoadingState } from '@/components/ui/LoadingState';
import { StockTable } from '@/components/domain/stocks/StockTable';
import { stocksApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';

export function StocksPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: stocks, isLoading } = useQuery({
    queryKey: queryKeys.stocks.list(),
    queryFn: () => stocksApi.fetchStocks(),
  });

  const filteredStocks = useMemo(() => {
    if (!stocks) return [];
    const search = searchTerm.toLowerCase();
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(search) ||
        stock.name.toLowerCase().includes(search)
    );
  }, [stocks, searchTerm]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stocks"
        description="Browse and search available stocks"
      />

      <div className="max-w-md">
        <Input
          placeholder="Search by symbol or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <LoadingState rows={10} columns={6} />
      ) : (
        <StockTable
          stocks={filteredStocks}
          onSelectStock={(stock) => navigate(`/stocks/${stock.symbol}`)}
        />
      )}
    </div>
  );
}

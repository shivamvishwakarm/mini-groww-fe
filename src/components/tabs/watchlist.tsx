import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { watchlistApi, stocksApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Search, ArrowUpDown } from 'lucide-react';
import { WatchlistSkeleton } from '@/components/ui/WatchlistSkeleton';
import { toast } from 'sonner';

export function Watchlist() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'price' | 'change'; direction: 'asc' | 'desc' } | null>(null);

    // Fetch watchlist symbols
    const { data: watchlistSymbols, isLoading: isWatchlistLoading } = useQuery({
        queryKey: queryKeys.watchlist.list(),
        queryFn: () => watchlistApi.getWatchlist(),
    });

    // Fetch all stocks to get details
    const { data: allStocks, isLoading: isStocksLoading } = useQuery({
        queryKey: queryKeys.stocks.list(),
        queryFn: () => stocksApi.fetchStocks(),
    });

    const removeMutation = useMutation({
        mutationFn: (symbol: string) => watchlistApi.removeFromWatchlist(symbol),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.watchlist.list() });
            toast.success('Removed from watchlist');
        },
        onError: () => {
            toast.error('Failed to remove from watchlist');
        },
    });

    const isLoading = isWatchlistLoading || isStocksLoading;

    const processedStocks = useMemo(() => {
        if (!allStocks || !watchlistSymbols) return [];

        let stocks = allStocks.filter((stock) => watchlistSymbols.includes(stock.symbol));

        // Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            stocks = stocks.filter(
                (stock) =>
                    stock.name.toLowerCase().includes(query) ||
                    stock.symbol.toLowerCase().includes(query)
            );
        }

        // Sort
        if (sortConfig) {
            stocks.sort((a, b) => {
                let aValue: any = a[sortConfig.key === 'price' ? 'currentPrice' : sortConfig.key === 'change' ? 'changePercent' : 'name'];
                let bValue: any = b[sortConfig.key === 'price' ? 'currentPrice' : sortConfig.key === 'change' ? 'changePercent' : 'name'];

                if (sortConfig.key === 'name') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return stocks;
    }, [allStocks, watchlistSymbols, searchQuery, sortConfig]);

    const handleSort = (key: 'name' | 'price' | 'change') => {
        setSortConfig((current) => {
            if (current?.key === key) {
                return current.direction === 'asc'
                    ? { key, direction: 'desc' }
                    : null;
            }
            return { key, direction: 'asc' };
        });
    };

    if (isLoading) {
        return <WatchlistSkeleton />;
    }

    // Dummy Sparkline Component
    const Sparkline = ({ isPositive }: { isPositive: boolean }) => (
        <svg width="100" height="30" viewBox="0 0 100 30" className="opacity-75">
            <path
                d={isPositive
                    ? "M0 25 C20 25, 20 10, 40 15 S60 20, 80 5 L100 0"
                    : "M0 5 C20 5, 20 20, 40 15 S60 10, 80 25 L100 30"}
                fill="none"
                stroke={isPositive ? "#16a34a" : "#dc2626"}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );

    return (
        <Card className="mt-10 max-w-7xl mx-auto border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-gray-900">My Watchlist</CardTitle>
                <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search your watchlist"
                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {processedStocks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <Search className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {searchQuery ? 'No stocks found' : 'Your watchlist is empty'}
                        </h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            {searchQuery ? `No results for "${searchQuery}"` : 'Add stocks to track their performance'}
                        </p>
                        {!searchQuery && (
                            <Button onClick={() => navigate('/stocks/explore')} variant="outline">
                                Explore Stocks
                            </Button>
                        )}
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-gray-100">
                                <TableHead
                                    className="w-[40%] cursor-pointer hover:text-gray-900 transition-colors py-4 pl-6"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Company
                                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                                    </div>
                                </TableHead>
                                <TableHead className="w-[20%] text-center">Trend</TableHead>
                                <TableHead
                                    className="w-[20%] text-right cursor-pointer hover:text-gray-900 transition-colors"
                                    onClick={() => handleSort('price')}
                                >
                                    <div className="flex items-center justify-end gap-1">
                                        Market Price
                                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                                    </div>
                                </TableHead>
                                <TableHead className="w-[10%] text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {processedStocks.map((stock) => {
                                const isPositive = (stock.changePercent ?? 0) >= 0;
                                return (
                                    <TableRow
                                        key={stock.symbol}
                                        className="cursor-pointer hover:bg-gray-50/50 border-b border-gray-50 transition-colors group"
                                        onClick={() => navigate(`/stocks/${stock.symbol}`)}
                                    >
                                        <TableCell className="py-4 pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                                                    {stock.symbol.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{stock.name}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{stock.symbol}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center">
                                                <Sparkline isPositive={isPositive} />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="font-semibold text-gray-900">₹{stock.currentPrice.toFixed(2)}</div>
                                            <div className={`text-xs font-medium mt-0.5 flex items-center justify-end gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                {isPositive ? '+' : ''}₹{(stock.change ?? 0).toFixed(2)}
                                                <span>({(stock.changePercent ?? 0).toFixed(2)}%)</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeMutation.mutate(stock.symbol);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Search, ChartCandlestick } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { stocksApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import type { Stock } from '@/lib/types';

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: stocks, isLoading } = useQuery({
        queryKey: queryKeys.stocks.list(),
        queryFn: () => stocksApi.fetchStocks(),
    });

    const filteredStocks = useMemo(() => {
        if (!stocks) return [];
        const search = searchTerm.toLowerCase().trim();
        if (!search) return stocks;

        return stocks.filter(
            (stock) =>
                stock.symbol.toLowerCase().includes(search) ||
                stock.name.toLowerCase().includes(search)
        );
    }, [stocks, searchTerm]);

    const handleStockSelect = (stock: Stock) => {
        navigate(`/stocks/${stock.symbol}`);
        onOpenChange(false);
        setSearchTerm('');
    };

    // Reset search when dialog closes
    useEffect(() => {
        if (!open) {
            setSearchTerm('');
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] p-0 bg-white">
                <DialogHeader className="px-4 pt-4 pb-2">
                    <DialogTitle className="sr-only">Search Stocks</DialogTitle>

                    {/* Search Input */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                        <Search className="h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search stocks by name or symbol..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-base flex-1 text-gray-900 placeholder-gray-500"
                            autoFocus
                        />
                    </div>

                    {/* Filter Chip */}
                    <div className="flex items-center gap-2 mt-3">
                        <div className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-800 border border-gray-200 py-2 font-medium">
                            All Stocks ({filteredStocks.length})
                        </div>
                    </div>
                </DialogHeader>

                {/* Stock List */}
                <div className="overflow-y-auto max-h-[calc(80vh-140px)] px-2">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">
                            Loading stocks...
                        </div>
                    ) : filteredStocks.length > 0 ? (
                        <div className="space-y-1 pb-2">
                            {filteredStocks.map((stock) => {

                                return (
                                    <button
                                        key={stock.symbol}
                                        onClick={() => handleStockSelect(stock)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                                            <ChartCandlestick className="h-4 w-4 text-gray-600" />
                                        </div>

                                        {/* Stock Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-gray-900 truncate font-normal">
                                                {stock.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                US Stock • {stock.symbol}
                                            </div>
                                        </div>



                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No stocks found matching &quot;{searchTerm}&quot;
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

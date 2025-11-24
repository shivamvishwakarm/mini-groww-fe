import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Settings, HelpCircle, Loader2 } from 'lucide-react';
import type { Holding } from '@/lib/types';
import { ordersApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { toast } from 'sonner';

interface StockOrderPanelProps {
    holding: Holding;
    onClose: () => void;
    balance?: number;
}

export function StockOrderPanel({ holding, onClose, balance = 0 }: StockOrderPanelProps) {
    const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
    const [quantity, setQuantity] = useState<string>('');
    const queryClient = useQueryClient();

    // Mock price for now, ideally should come from real-time data
    const currentPrice = holding.currentPrice;

    const { mutate: createOrder, isPending } = useMutation({
        mutationFn: ordersApi.createOrder,
        onSuccess: () => {
            toast.success(`Successfully ${side === 'BUY' ? 'bought' : 'sold'} ${quantity} shares of ${holding.symbol}`);
            queryClient.invalidateQueries({ queryKey: queryKeys.portfolio.summary() });
            setQuantity('');
            onClose();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to place order');
        },
    });

    const handleOrder = () => {
        const qty = parseInt(quantity);
        if (!qty || qty <= 0) {
            toast.error('Please enter a valid quantity');
            return;
        }

        createOrder({
            symbol: holding.symbol,
            side,
            quantity: qty,
        });
    };

    return (
        <Card className="h-full flex flex-col border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0 border-b border-gray-100">
                <div>
                    <CardTitle className="text-lg font-bold text-gray-900">{holding.symbol}</CardTitle>
                    <div className="text-sm text-gray-500 mt-1">
                        NSE ₹{currentPrice.toLocaleString('en-IN')}
                        <span className="text-red-500 ml-1">(-2.02%)</span> {/* Mock change */}
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>

            <CardContent className="flex-1 p-4 space-y-6">
                <Tabs value={side} onValueChange={(v) => setSide(v as 'BUY' | 'SELL')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-transparent border-b border-gray-200 rounded-none h-auto p-0 ">
                        <TabsTrigger
                            value="BUY"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:text-green-600 data-[state=active]:shadow-none py-3 font-semibold"
                        >
                            BUY
                        </TabsTrigger>
                        <TabsTrigger
                            value="SELL"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-red-600 data-[state=active]:shadow-none py-3 font-semibold"
                        >
                            SELL
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm" className="rounded-full px-4 border-gray-300 text-gray-700 hover:bg-gray-50">Delivery</Button>
                    <Button variant="outline" size="sm" className="rounded-full px-4 border-gray-200 text-gray-500 hover:bg-gray-50">Intraday</Button>
                    <Button variant="outline" size="sm" className="rounded-full px-4 border-gray-200 text-gray-500 hover:bg-gray-50">MTF 3.03x</Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-gray-200 ml-auto">
                        <Settings className="h-4 w-4 text-gray-500" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-600 font-medium">Qty <span className="text-gray-900 font-bold">NSE</span></label>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-32 text-right font-medium"
                            placeholder="0"
                            min="1"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-gray-600 font-medium">Price <span className="text-gray-900 font-bold">Market</span></label>
                        <div className="w-32 bg-gray-50 border border-gray-200 rounded-md py-2 px-3 text-right text-gray-500 text-sm font-medium">
                            At market
                        </div>
                    </div>
                </div>
            </CardContent>

            <div className="p-4 bg-yellow-50 border-t border-yellow-100 mx-4 mb-4 rounded-md flex items-start gap-2">
                <p className="text-xs text-yellow-800 flex-1">
                    Market order might be subject to price fluctuation
                </p>
                <HelpCircle className="h-4 w-4 text-yellow-700 flex-shrink-0" />
            </div>

            <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-gray-500">Balance: ₹{balance.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500 border-b border-dashed border-gray-300">Approx req.: ₹{(currentPrice * (Number(quantity) || 0)).toLocaleString('en-IN')}</span>
                </div>
                <Button
                    className={`w-full py-6 text-lg font-semibold text-white ${side === 'BUY' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-400 hover:bg-red-500'}`}
                    onClick={handleOrder}
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : null}
                    {side === 'BUY' ? 'Buy' : 'Sell'}
                </Button>
            </div>
        </Card>
    );
}

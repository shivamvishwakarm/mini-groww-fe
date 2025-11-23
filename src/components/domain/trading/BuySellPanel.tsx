import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Stock, CreateOrderRequest } from '@/lib/types';

interface BuySellPanelProps {
  stock: Stock;
  cash: number;
  onCreateOrder: (order: CreateOrderRequest) => Promise<void>;
  isLoading?: boolean;
}

export function BuySellPanel({
  stock,
  cash,
  onCreateOrder,
  isLoading = false,
}: BuySellPanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState(stock.price);
  const [sellPrice, setSellPrice] = useState(stock.price);

  const buyTotal = quantity * buyPrice;
  const sellTotal = quantity * sellPrice;

  const handleBuy = async () => {
    if (quantity <= 0) return;
    if (buyTotal > cash) {
      alert('Insufficient cash');
      return;
    }
    await onCreateOrder({
      symbol: stock.symbol,
      side: 'BUY',
      quantity,
      price: buyPrice,
    });
    setQuantity(1);
    setBuyPrice(stock.price);
  };

  const handleSell = async () => {
    if (quantity <= 0) return;
    await onCreateOrder({
      symbol: stock.symbol,
      side: 'SELL',
      quantity,
      price: sellPrice,
    });
    setQuantity(1);
    setSellPrice(stock.price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade {stock.symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div>
              <Label htmlFor="buy-quantity">Quantity</Label>
              <Input
                id="buy-quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <div>
              <Label htmlFor="buy-price">Price per Share</Label>
              <Input
                id="buy-price"
                type="number"
                step="0.01"
                value={buyPrice}
                onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2 p-3 bg-muted rounded">
              <div className="flex justify-between text-sm">
                <span>Total Cost:</span>
                <span className="font-semibold">${buyTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Available Cash:</span>
                <span className={cash >= buyTotal ? 'text-green-600' : 'text-red-600'}>
                  ${cash.toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              onClick={handleBuy}
              disabled={isLoading || buyTotal > cash || quantity <= 0}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Buy'}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div>
              <Label htmlFor="sell-quantity">Quantity</Label>
              <Input
                id="sell-quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <div>
              <Label htmlFor="sell-price">Price per Share</Label>
              <Input
                id="sell-price"
                type="number"
                step="0.01"
                value={sellPrice}
                onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2 p-3 bg-muted rounded">
              <div className="flex justify-between text-sm">
                <span>Total Proceeds:</span>
                <span className="font-semibold">${sellTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button
              onClick={handleSell}
              disabled={isLoading || quantity <= 0}
              variant="outline"
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Sell'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

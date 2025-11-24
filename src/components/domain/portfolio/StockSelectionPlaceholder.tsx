import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MousePointerClick, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StockSelectionPlaceholderProps {
    balance?: number;
}

export function StockSelectionPlaceholder({ balance = 0 }: StockSelectionPlaceholderProps) {
    return (
        <Card className="h-full flex flex-col border border-gray-200 shadow-sm">
            <CardContent className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-6 relative">
                    <div className="h-2 w-32 bg-gray-100 rounded mb-2"></div>
                    <div className="h-12 w-48 bg-green-50 rounded flex items-center justify-center">
                        <MousePointerClick className="h-8 w-8 text-gray-700 absolute -bottom-4 -right-4" />
                    </div>
                    <div className="h-2 w-32 bg-gray-100 rounded mt-2"></div>
                </div>
                <p className="text-gray-600 font-medium">Select a stock to get started</p>
            </CardContent>
            <CardFooter className="border-t border-dashed border-gray-200 p-4 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-600">
                    <Wallet className="h-5 w-5" />
                    <span className="text-sm">Balance: ₹{balance.toLocaleString('en-IN')}</span>
                </div>
                <Button variant="link" className="text-blue-600 font-semibold h-auto p-0 hover:no-underline">
                    Add money
                </Button>
            </CardFooter>
        </Card>
    );
}

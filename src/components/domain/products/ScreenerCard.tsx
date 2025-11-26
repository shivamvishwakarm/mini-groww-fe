import { Card } from '@/components/ui/card';
import type { Screener } from '@/lib/mockMarketData';
import { ArrowRight } from 'lucide-react';

interface ScreenerCardProps {
    screener: Screener;
}

export function ScreenerCard({ screener }: ScreenerCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 cursor-pointer group h-full">
            <div className="p-5 flex flex-col h-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${screener.color}`}>
                    {screener.icon}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {screener.name}
                </h3>

                <p className="text-sm text-gray-500 mb-4 flex-1">
                    {screener.description}
                </p>

                <div className="flex items-center text-sm font-medium text-green-600 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 duration-300">
                    Launch Screener <ArrowRight className="h-4 w-4 ml-1" />
                </div>
            </div>
        </Card>
    );
}

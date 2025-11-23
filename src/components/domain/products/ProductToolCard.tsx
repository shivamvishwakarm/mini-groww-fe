import { Card } from '@/components/ui/card';
import type { ProductTool } from '@/lib/mockMarketData';

interface ProductToolCardProps {
    product: ProductTool;
    onClick?: () => void;
}

export function ProductToolCard({ product, onClick }: ProductToolCardProps) {
    const badgeColors = {
        green: 'bg-green-50 text-green-700 border-green-200',
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200',
    };

    return (
        <Card
            className="p-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">{product.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </div>
                {product.badge && (
                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-full border ${badgeColors[product.badgeColor || 'green']
                            }`}
                    >
                        {product.badge}
                    </span>
                )}
            </div>
        </Card>
    );
}

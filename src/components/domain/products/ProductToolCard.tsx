import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import type { ProductTool } from '@/lib/mockMarketData';

interface ProductToolCardProps {
    product: ProductTool;
    variant?: 'card' | 'row';
    onClick?: () => void;
}

export function ProductToolCard({ product, onClick, variant = 'card' }: ProductToolCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate('/products');
        }
    };

    const badgeColors = {
        green: 'bg-green-50 text-green-700 border-green-200',
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200',
        red: 'bg-red-50 text-red-700 border-red-200',
        orange: 'bg-orange-50 text-orange-700 border-orange-200',
    };

    const content = (
        <div className="flex items-center justify-between w-full">
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
    );

    if (variant === 'row') {
        return (
            <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                onClick={handleClick}
            >
                {content}
            </div>
        );
    }

    return (
        <Card
            className="p-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
            onClick={handleClick}
        >
            {content}
        </Card>
    );
}

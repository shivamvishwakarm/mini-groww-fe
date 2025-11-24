
import { TableCell, TableRow } from '@/components/ui/table';
import type { Holding } from '@/lib/types';

interface HoldingRowProps {
  holding: Holding;
  onClick?: () => void;
}

export function HoldingRow({ holding, onClick }: HoldingRowProps) {
  const isPositive = holding.profitLoss >= 0;
  // Mock 1D change for now as it's not in the API
  const oneDayChange = -2.00;
  const oneDayChangePercent = 0.21;
  const isOneDayPositive = oneDayChange >= 0;

  return (
    <TableRow onClick={onClick} className={`h-20 ${onClick ? 'cursor-pointer hover:bg-muted' : ''}`}>
      {/* Company Column */}
      <TableCell className="align-middle">
        <div className="flex items-center justify-between max-w-md">
          <div>
            <div className=" text-sm text-gray-900">{holding.symbol}</div>
            <div className="text-xs text-gray-500 mt-1">
              {holding.quantity} share{holding.quantity !== 1 ? 's' : ''} • Avg. ₹{holding.avgBuyPrice.toFixed(2)}
            </div>
          </div>
          {/* Sparkline SVG */}
          <div className="hidden sm:block w-24 h-8">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-orange-500 fill-none stroke-2">
              <path d="M0,15 Q10,5 20,15 T40,15 T60,20 T80,10 T100,25" />
            </svg>
          </div>
        </div>
      </TableCell>

      {/* Market Price Column */}
      <TableCell className="text-right align-middle">
        <div className="font-medium text-gray-900">₹{holding.currentPrice.toFixed(2)}</div>
        <div className={`text-xs mt-1 ${isOneDayPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isOneDayPositive ? '+' : ''}{oneDayChange.toFixed(2)} ({oneDayChangePercent.toFixed(2)}%)
        </div>
      </TableCell>

      {/* Returns Column */}
      <TableCell className="text-right align-middle">
        <div className="text-gray-500 text-sm">
          {isPositive ? '+' : ''}₹{holding.profitLoss.toFixed(2)}
        </div>
        <div className={`font-medium text-xs mt-1 ${isPositive ? 'text-green-500' : 'text-green-500'}`}>
          {holding.profitLossPercent.toFixed(2)}%
        </div>
      </TableCell>

      {/* Current (Invested) Column */}
      <TableCell className="text-right align-middle">
        <div className="font-medium text-gray-900">₹{holding.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="text-xs text-gray-500 mt-1">₹{holding.investedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </TableCell>
    </TableRow>
  );
}

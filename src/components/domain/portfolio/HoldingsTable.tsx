import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { HoldingRow } from './HoldingRow';
import { TrendingUp, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Holding } from '@/lib/types';

interface HoldingsTableProps {
  holdings: Holding[];
  onSelectHolding?: (holding: Holding) => void;
}

export function HoldingsTable({ holdings, onSelectHolding }: HoldingsTableProps) {
  const navigate = useNavigate();

  if (holdings.length === 0) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="py-16">
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            {/* Icon */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-green-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            {/* Text */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Your Investment Journey
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              You haven't invested in any stocks yet. Explore our curated list of stocks and build your portfolio today.
            </p>

            {/* Action Button */}
            <Button
              onClick={() => navigate('/stocks')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              Explore Stocks
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0 ">
        <Table>
          <TableHeader >
            <TableRow className="bg-gray-100 h-16 rounded-full">
              <TableHead className="w-[40%]">Company</TableHead>
              <TableHead className="text-right">Market price (1D%)</TableHead>
              <TableHead className="text-right">Returns (%)</TableHead>
              <TableHead className="text-right">Current (Invested)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.map((holding) => (
              <HoldingRow
                key={holding.symbol}
                holding={holding}
                onClick={() => onSelectHolding?.(holding)}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

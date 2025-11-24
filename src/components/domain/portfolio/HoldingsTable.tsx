import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { HoldingRow } from './HoldingRow';
import type { Holding } from '@/lib/types';

interface HoldingsTableProps {
  holdings: Holding[];
  onSelectHolding?: (holding: Holding) => void;
}

export function HoldingsTable({ holdings, onSelectHolding }: HoldingsTableProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
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

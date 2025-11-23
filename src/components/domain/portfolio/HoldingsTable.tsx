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
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Avg Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Gain/Loss</TableHead>
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

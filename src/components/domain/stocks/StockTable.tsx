import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { StockRow } from './StockRow';
import type { Stock } from '@/lib/types';

interface StockTableProps {
  stocks: Stock[];
  onSelectStock?: (stock: Stock) => void;
}

export function StockTable({ stocks, onSelectStock }: StockTableProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock) => (
              <StockRow
                key={stock.id}
                stock={stock}
                onClick={() => onSelectStock?.(stock)}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

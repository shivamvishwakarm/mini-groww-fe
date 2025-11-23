import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

interface DataTableProps {
  title?: string;
  columns: Array<{
    header: string;
    key: string;
    render?: (value: unknown, row: unknown) => React.ReactNode;
  }>;
  data: unknown[];
  onRowClick?: (row: unknown) => void;
  emptyMessage?: string;
}

export function DataTable({
  title,
  columns,
  data,
  onRowClick,
  emptyMessage = 'No data available',
}: DataTableProps) {
  if (data.length === 0) {
    return (
      <>
        {title && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">{emptyMessage}</p>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      {title && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      )}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'cursor-pointer hover:bg-muted' : ''}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(
                            (row as Record<string, unknown>)[col.key],
                            row
                          )
                        : String((row as Record<string, unknown>)[col.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

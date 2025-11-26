import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function StockTableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50/50">
                        <TableHead className="w-[15%]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="w-[30%]">
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                        <TableHead className="w-[15%] text-right">
                            <Skeleton className="h-4 w-12 ml-auto" />
                        </TableHead>
                        <TableHead className="w-[20%] text-right">
                            <Skeleton className="h-4 w-16 ml-auto" />
                        </TableHead>
                        <TableHead className="w-[20%] text-right">
                            <Skeleton className="h-4 w-20 ml-auto" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <TableRow key={i} className="border-b border-gray-100">
                            <TableCell>
                                <Skeleton className="h-4 w-16" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-40" />
                            </TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="h-4 w-20 ml-auto" />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Skeleton className="h-4 w-4 rounded" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="h-4 w-24 ml-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

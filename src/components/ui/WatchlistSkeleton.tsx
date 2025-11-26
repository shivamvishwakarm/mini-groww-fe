import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function WatchlistSkeleton() {
    return (
        <Card className="mt-10 max-w-7xl mx-auto border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-gray-900">
                    <Skeleton className="h-6 w-32" />
                </CardTitle>
                <Skeleton className="h-10 w-64" />
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-gray-100">
                            <TableHead className="w-[40%] py-4 pl-6">
                                <Skeleton className="h-4 w-20" />
                            </TableHead>
                            <TableHead className="w-[20%] text-center">
                                <Skeleton className="h-4 w-12 mx-auto" />
                            </TableHead>
                            <TableHead className="w-[20%] text-right">
                                <Skeleton className="h-4 w-24 ml-auto" />
                            </TableHead>
                            <TableHead className="w-[10%] text-right pr-6">
                                <Skeleton className="h-4 w-16 ml-auto" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow
                                key={i}
                                className="border-b border-gray-50"
                            >
                                <TableCell className="py-4 pl-6">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-10 h-10 rounded-lg" />
                                        <div className="flex-1">
                                            <Skeleton className="h-4 w-48 mb-2" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className="h-8 w-24 mx-auto" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="h-4 w-20 ml-auto mb-2" />
                                    <Skeleton className="h-3 w-16 ml-auto" />
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                    <Skeleton className="h-8 w-8 ml-auto rounded" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

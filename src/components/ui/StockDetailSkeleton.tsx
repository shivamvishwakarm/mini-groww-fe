import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function StockDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Back Button */}
                <Skeleton className="h-9 w-20 mb-6" />

                {/* Stock Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <div className="flex items-baseline gap-3 mb-2">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded" />
                </div>

                {/* Price and Metrics */}
                <Card className="mb-6 border border-gray-200">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-6 w-32 mb-1" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Chart and Trading Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <Card className="border border-gray-200 border-none shadow-none">
                            <CardContent className="p-6">
                                <Skeleton className="h-64 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card className="p-6">
                            <CardHeader className="p-0 mb-4">
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent className="p-0 space-y-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

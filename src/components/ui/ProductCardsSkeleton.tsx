import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function ProductCardsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                </Card>
            ))}
        </div>
    );
}

import { useQuery } from '@tanstack/react-query';
import { MarketTicker } from '@/components/domain/market/MarketTicker';
import { NavigationTabs } from '@/components/ui/NavigationTabs';
import { indicesApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { Explore } from '@/components/tabs/explore';

export function ExplorePage() {
    // Fetch indices from API
    const { data: indices } = useQuery({
        queryKey: queryKeys.indices.list(),
        queryFn: () => indicesApi.fetchIndices(),
        refetchInterval: 60000, // Refetch every 60 seconds
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Tabs */}
            <NavigationTabs />

            {/* Market Ticker */}
            {indices && indices.length > 0 && <MarketTicker indices={indices} />}

            {/* Content */}
            <Explore />
        </div>
    );
}

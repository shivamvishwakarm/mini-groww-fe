import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MarketTicker } from '@/components/domain/market/MarketTicker';
import { NavigationTabs } from '@/components/ui/NavigationTabs';
import { indicesApi } from '@/lib/api';
import { queryKeys } from '@/query/keys';
import { Explore } from '@/components/tabs/explore';
import { Portfolio } from '@/components/tabs/portfolio';
import { Watchlist } from '@/components/tabs/watchlist';
import { Orders } from '@/components/tabs/order';
import { Positions } from '@/components/tabs/position';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('explore');

  // Fetch indices from API
  const { data: indices } = useQuery({
    queryKey: queryKeys.indices.list(),
    queryFn: () => indicesApi.fetchIndices(),
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <Explore />;
      case 'holdings':
        return <Portfolio />;
      case 'watchlist':
        return <Watchlist />;
      case 'orders':
        return <Orders />;
      case 'positions':
        return <Positions />;
      default:
        return <Explore />;
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Market Ticker */}
      {indices && indices.length > 0 && <MarketTicker indices={indices} />}

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      {renderContent()}

    </div>
  );
}

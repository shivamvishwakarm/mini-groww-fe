import { useState } from 'react';
import { MarketTicker } from '@/components/domain/market/MarketTicker';
import { NavigationTabs } from '@/components/ui/NavigationTabs';
import { marketIndices } from '@/lib/mockMarketData';
import { Explore } from '@/components/tabs/explore';
import { Portfolio } from '@/components/tabs/portfolio';
import { Watchlist } from '@/components/tabs/watchlist';
import { Orders } from '@/components/tabs/order';
import { Positions } from '@/components/tabs/position';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('explore');



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


      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {/* Market Ticker */}
      <MarketTicker indices={marketIndices} />



      {/* Main Content */}
      {renderContent()}

    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { IPOCard } from '@/components/domain/products/IPOCard';
import { BondCard } from '@/components/domain/products/BondCard';
import { ETFCard } from '@/components/domain/products/ETFCard';
import { ScreenerCard } from '@/components/domain/products/ScreenerCard';
import { ipos, bonds, etfs, screeners } from '@/lib/mockMarketData';
import { NavigationTabs } from '@/components/ui/NavigationTabs';

export function ProductsPage() {
    const navigate = useNavigate();
    const [ipoTab, setIpoTab] = useState<'open' | 'upcoming' | 'closed'>('open');
    const [bondFilter, setBondFilter] = useState<'All' | 'Government' | 'Corporate' | 'SGB'>('All');
    const [etfFilter, setEtfFilter] = useState<'All' | 'Index' | 'Gold' | 'International'>('All');

    const filteredIPOs = ipos.filter(ipo => ipo.status === ipoTab);

    const filteredBonds = bondFilter === 'All'
        ? bonds
        : bonds.filter(bond => bond.type === bondFilter);

    const filteredETFs = etfFilter === 'All'
        ? etfs
        : etfs.filter(etf => etf.category === etfFilter || (etfFilter === 'International' && etf.category === 'International'));

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <NavigationTabs />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/stocks/explore')}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Products & Tools</h1>
                        <p className="text-gray-500">Explore investment opportunities beyond stocks</p>
                    </div>
                </div>

                {/* IPO Section */}
                <section className="mb-12" id="ipo">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">IPO</h2>
                        <div className="flex bg-gray-200 p-1 rounded-lg">
                            {(['open', 'upcoming', 'closed'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setIpoTab(tab)}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${ipoTab === tab
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredIPOs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredIPOs.map((ipo) => (
                                <IPOCard key={ipo.symbol} ipo={ipo} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No {ipoTab} IPOs available at the moment</p>
                        </div>
                    )}
                </section>

                {/* Bonds Section */}
                <section className="mb-12" id="bonds">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Bonds</h2>
                        <div className="flex gap-2">
                            {(['All', 'Government', 'Corporate', 'SGB'] as const).map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setBondFilter(filter)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${bondFilter === filter
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBonds.map((bond) => (
                            <BondCard key={bond.id} bond={bond} />
                        ))}
                    </div>
                </section>

                {/* ETFs Section */}
                <section className="mb-12" id="etf">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">ETFs</h2>
                        <div className="flex gap-2">
                            {(['All', 'Index', 'Gold', 'International'] as const).map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setEtfFilter(filter)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${etfFilter === filter
                                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredETFs.map((etf) => (
                            <ETFCard key={etf.symbol} etf={etf} />
                        ))}
                    </div>
                </section>

                {/* Screeners Section */}
                <section id="screener">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Screeners & Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {screeners.map((screener) => (
                            <ScreenerCard key={screener.id} screener={screener} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

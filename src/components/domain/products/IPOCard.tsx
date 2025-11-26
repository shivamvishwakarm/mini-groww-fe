import { Card } from '@/components/ui/card';
import type { IPO } from '@/lib/mockMarketData';
import { Calendar, TrendingUp } from 'lucide-react';

interface IPOCardProps {
    ipo: IPO;
}

export function IPOCard({ ipo }: IPOCardProps) {
    const getStatusColor = (status: IPO['status']) => {
        switch (status) {
            case 'open': return 'bg-green-100 text-green-700 border-green-200';
            case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group">
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400">
                            {ipo.logo ? <img src={ipo.logo} alt={ipo.name} className="w-full h-full object-cover rounded-lg" /> : ipo.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors">{ipo.name}</h3>
                            <p className="text-xs text-gray-500">{ipo.symbol}</p>
                        </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${getStatusColor(ipo.status)}`}>
                        {ipo.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Price Band</p>
                        <p className="text-sm font-medium text-gray-900">{ipo.priceBand}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Lot Size</p>
                        <p className="text-sm font-medium text-gray-900">{ipo.lotSize} Shares</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Min Investment</p>
                        <p className="text-sm font-medium text-gray-900">₹{ipo.minInvestment.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Issue Size</p>
                        <p className="text-sm font-medium text-gray-900">{ipo.issueSize}</p>
                    </div>
                </div>

                {ipo.subscriptionStatus && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-md mb-4">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Subscribed {ipo.subscriptionStatus}x
                    </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-3 mt-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{ipo.status === 'closed' ? `Listed on ${ipo.listingDate}` : `${ipo.subscriptionDates}`}</span>
                </div>
            </div>
        </Card>
    );
}

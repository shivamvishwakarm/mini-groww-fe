import { Card } from '@/components/ui/card';
import type { Bond } from '@/lib/mockMarketData';
import { ShieldCheck, CalendarClock, Percent } from 'lucide-react';

interface BondCardProps {
    bond: Bond;
}

export function BondCard({ bond }: BondCardProps) {
    const getRatingColor = (rating: Bond['rating']) => {
        if (rating.startsWith('AAA')) return 'bg-green-100 text-green-700 border-green-200';
        if (rating.startsWith('AA')) return 'bg-blue-100 text-blue-700 border-blue-200';
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    };

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group">
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                {bond.type}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getRatingColor(bond.rating)}`}>
                                {bond.rating}
                            </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 min-h-[3rem]">
                            {bond.name}
                        </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                    </div>
                </div>

                <div className="flex items-end justify-between mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Yield</p>
                        <p className="text-2xl font-bold text-green-700">{bond.yield}%</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Min Investment</p>
                        <p className="text-sm font-medium text-gray-900">₹{bond.minInvestment.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1.5">
                        <CalendarClock className="h-3.5 w-3.5" />
                        <span>Maturity: {bond.maturityDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                        <Percent className="h-3.5 w-3.5" />
                        <span>{bond.interestPayment}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

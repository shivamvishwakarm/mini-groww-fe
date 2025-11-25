import { Activity, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function Positions() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Positions</h1>
                <p className="text-sm text-gray-600">Track your active intraday trading positions</p>
            </div>

            {/* Empty State */}
            <Card className="border border-gray-200 shadow-sm">
                <CardContent className="py-20">
                    <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                        {/* Icon Group */}
                        <div className="relative mb-8">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                                <Activity className="w-16 h-16 text-green-600" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-green-100">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-blue-100">
                                <BarChart3 className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            No Active Positions
                        </h3>
                        <p className="text-gray-600 text-base mb-6 max-w-md">
                            You don't have any open intraday positions at the moment. Your active trades will appear here once you place an order.
                        </p>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
                            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                                <div className="text-sm font-medium text-blue-900 mb-1">Real-time Tracking</div>
                                <div className="text-xs text-blue-700">Monitor your positions live</div>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                                <div className="text-sm font-medium text-green-900 mb-1">P&L Updates</div>
                                <div className="text-xs text-green-700">See profits and losses instantly</div>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                                <div className="text-sm font-medium text-purple-900 mb-1">Quick Actions</div>
                                <div className="text-xs text-purple-700">Exit positions with one click</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
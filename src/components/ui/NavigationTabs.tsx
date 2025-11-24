import { motion } from 'framer-motion';

interface NavigationTabsProps {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

const tabs = [
    { id: 'explore', label: 'Explore' },
    { id: 'holdings', label: 'Holdings' },
    { id: 'positions', label: 'Positions' },
    { id: 'orders', label: 'Orders' },
    { id: 'watchlist', label: 'Watchlist' },
];



export function NavigationTabs({ activeTab = 'explore', onTabChange }: NavigationTabsProps) {
    return (
        <div className="md:px-24 px-8 bg-white border-b border-gray-200">
            <div className="flex items-center gap-1 px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange?.(tab.id)}
                        className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-t-sm"
                                transition={{ type: "spring", stiffness: 600, damping: 50 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

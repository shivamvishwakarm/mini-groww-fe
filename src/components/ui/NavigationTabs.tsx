import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const tabs = [
    { id: 'explore', label: 'Explore', path: '/stocks/explore' },
    { id: 'holdings', label: 'Holdings', path: '/stocks/holdings' },
    { id: 'positions', label: 'Positions', path: '/stocks/positions' },
    { id: 'orders', label: 'Orders', path: '/stocks/orders' },
    { id: 'watchlist', label: 'Watchlist', path: '/stocks/watchlist' },
];

export function NavigationTabs() {
    return (
        <div className="md:px-24 px-8 bg-white border-b border-gray-200">
            <div className="flex items-center gap-1 px-2">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.id}
                        to={tab.path}
                        className={({ isActive }) =>
                            `px-4 py-3 text-sm font-medium transition-colors relative ${isActive
                                ? 'text-gray-900'
                                : 'text-gray-500 hover:text-gray-900'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-t-sm"
                                        transition={{ type: "spring", stiffness: 600, damping: 50 }}
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

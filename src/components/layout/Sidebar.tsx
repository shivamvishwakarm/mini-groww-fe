import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  TrendingUp,
  Briefcase,
  ShoppingCart,
  ChevronLeft,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSidebarCollapsed } from '@/state/slices';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: BarChart3,
  },
  {
    label: 'Stocks',
    path: '/stocks',
    icon: TrendingUp,
  },
  {
    label: 'Portfolio',
    path: '/portfolio',
    icon: Briefcase,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: ShoppingCart,
  },
];

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <div
      className={`fixed md:static h-screen bg-slate-900 text-white transition-all duration-300 z-20 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-lg">Groww</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}
            className="text-white hover:bg-slate-800 hidden md:flex"
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform ${
                sidebarCollapsed ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                } ${sidebarCollapsed ? 'justify-center px-3' : ''}`
              }
              title={sidebarCollapsed ? label : ''}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
            <p>© 2024 Groww Clone</p>
            <p>Stock Trading Simulator</p>
          </div>
        )}
      </div>
    </div>
  );
}

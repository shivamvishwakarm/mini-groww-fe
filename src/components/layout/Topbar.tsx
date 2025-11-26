import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Bell, User, BarChart3, TrendingUp, Briefcase, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { useAppDispatch } from '@/lib/hooks';
import { logout } from '@/state/slices';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchDialog } from '@/components/ui/SearchDialog';

export function Topbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Keyboard shortcut handler for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchDialogOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { label: 'Stocks', path: '/stocks', icon: TrendingUp },
    { label: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { label: 'Orders', path: '/orders', icon: ShoppingCart },
  ];

  return (
    <div className="md:px-24 px-6   bg-white sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section */}
        <div className="flex items-center gap-6">
          {/* Logo placeholder - using Groww icon */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-6 text-lg">
            <a href="/stocks" className="text-gray-900 font-medium">Stocks</a>
            <a href="#" className="text-gray-500 cursor-not-allowed">F&O</a>
            <a href="#" className="text-gray-500 cursor-not-allowed">Mutual Funds</a>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search bar - clickable to open dialog */}
          <div
            className="hidden md:flex items-center gap-2 border rounded-lg px-3 py-2 min-w-[300px] cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => setSearchDialogOpen(true)}
          >
            <Search className="h-4 w-4 text-gray-500" />
            <div className="bg-transparent border-none outline-none text-sm flex-1 text-gray-500">
              Search Groww...
            </div>
            <kbd className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-300">⌘K</kbd>
          </div>




          {/* Notification bell */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-blue-500 hover:bg-blue-600"
              >
                <User className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <DropdownMenuItem
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`cursor-pointer ${isActive ? 'bg-accent' : ''}`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen} />
    </div>
  );
}

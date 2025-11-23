import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleSidebar, logout } from '@/state/slices';
import { useNavigate } from 'react-router-dom';

export function Topbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.session);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="border-b bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="ml-auto flex items-center gap-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Welcome, </span>
            <span className="font-medium">{user?.name}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAppSelector } from '@/lib/hooks';

export function AppLayout() {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <div className="flex h-screen bg-background">
      {/* Overlay for mobile */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-10"
          onClick={() => {
            // Will be handled by the store
          }}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-6 px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

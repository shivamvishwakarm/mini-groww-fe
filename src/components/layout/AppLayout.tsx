import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';

export function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

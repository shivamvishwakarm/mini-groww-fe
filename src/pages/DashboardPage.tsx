import { Navigate } from 'react-router-dom';

export function DashboardPage() {
  return <Navigate to="/stocks/explore" replace />;
}

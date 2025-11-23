import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { StocksPage } from '@/pages/StocksPage';
import { StockDetailPage } from '@/pages/StockDetailPage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'stocks',
        element: <StocksPage />,
      },
      {
        path: 'stocks/:symbol',
        element: <StockDetailPage />,
      },
      {
        path: 'portfolio',
        element: <PortfolioPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

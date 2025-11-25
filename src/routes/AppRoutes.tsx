import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { StocksPage } from '@/pages/StocksPage';
import { StockDetailPage } from '@/pages/StockDetailPage';
import { MostBoughtStocksPage } from '@/pages/MostBoughtStocksPage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from '@/components/AuthProvider';

import { Toaster } from 'sonner';

export const routes = [
  {
    path: '/login',
    element: (
      <>
        <LoginPage />
        <Toaster />
      </>
    ),
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AppLayout />
          <Toaster />
        </ProtectedRoute>
      </AuthProvider>
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
        path: 'most-bought-stocks',
        element: <MostBoughtStocksPage />,
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

import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { StockDetailPage } from '@/pages/StockDetailPage';
import { MostBoughtStocksPage } from '@/pages/MostBoughtStocksPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { HoldingsPage } from '@/pages/HoldingsPage';
import { PositionsPage } from '@/pages/PositionsPage';
import { OrdersTabPage } from '@/pages/OrdersTabPage';
import { WatchlistPage } from '@/pages/WatchlistPage';
import { ProductsPage } from '@/pages/ProductsPage';
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
        element: <Navigate to="/stocks/explore" replace />,
      },
      {
        path: 'dashboard',
        element: <Navigate to="/stocks/explore" replace />,
      },
      {
        path: 'stocks',
        element: <Navigate to="/stocks/explore" replace />,
      },
      {
        path: 'stocks/explore',
        element: <ExplorePage />,
      },
      {
        path: 'stocks/holdings',
        element: <HoldingsPage />,
      },
      {
        path: 'stocks/positions',
        element: <PositionsPage />,
      },
      {
        path: 'stocks/orders',
        element: <OrdersTabPage />,
      },
      {
        path: 'stocks/watchlist',
        element: <WatchlistPage />,
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
        element: <Navigate to="/stocks/holdings" replace />,
      },
      {
        path: 'orders',
        element: <Navigate to="/stocks/orders" replace />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

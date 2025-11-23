// Stock types
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: number;
  peRatio: number;
}

export interface StockPriceHistory {
  date: string;
  price: number;
}

export interface StockDetail extends Stock {
  description: string;
  priceHistory: StockPriceHistory[];
}

// Portfolio types
export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  gain: number;
  gainPercent: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalGain: number;
  totalGainPercent: number;
  cash: number;
  holdings: Holding[];
  valueHistory: PortfolioValuePoint[];
}

export interface PortfolioValuePoint {
  date: string;
  value: number;
}

// Order types
export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'PENDING' | 'FILLED' | 'CANCELLED';

export interface Order {
  id: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  filledAt?: string;
}

export interface CreateOrderRequest {
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  message: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

// Session types
export interface SessionState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Portfolio Redux state
export interface PortfolioState {
  holdings: Holding[];
  totalValue: number;
  totalInvested: number;
  totalGain: number;
  totalGainPercent: number;
  cash: number;
  loading: boolean;
  error: string | null;
}

// UI state
export interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
}

// Stock types
export interface Stock {
  _id: string;
  symbol: string;
  name: string;
  sector: string;
  currentPrice: number;
  previousClose: number;
  marketCap: number;
  // Optional fields that might be returned or computed
  description?: string;
  peRatio?: number;
  change?: number;
  changePercent?: number;
}

export interface StockPricePoint {
  date: string;
  price: number;
}

export interface StockDetail extends Stock {
  priceHistory?: StockPricePoint[];
}

// Portfolio types
export interface Holding {
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  currentValue: number;
  investedValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface PortfolioSummary {
  holdings: Holding[];
  totalInvestedValue: number;
  totalCurrentValue: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  availableBalance: number;
  totalPortfolioValue: number;
  // valueHistory is not currently provided by the API
  valueHistory?: PortfolioValuePoint[];
}

export interface PortfolioValuePoint {
  date: string;
  value: number;
}

// Order types
export type OrderSide = 'BUY' | 'SELL';

export interface Order {
  _id: string;
  userId: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
  createdAt: string;
  status: string;
}

export interface CreateOrderRequest {
  symbol: string;
  side: OrderSide;
  quantity: number;
  price?: number;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data?: Order;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface LoginResponse extends AuthResponse { }
export interface RegisterResponse extends AuthResponse { }

// Session types
export interface SessionState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// UI state
export interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
}

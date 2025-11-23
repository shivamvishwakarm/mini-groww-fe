import { client } from './client';
import type {
  Stock,
  StockDetail,
  PortfolioSummary,
  Order,
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  StockPricePoint,
} from '../types';

// Auth API
export const authApi = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await client.post<LoginResponse>('/auth/login', data);

    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await client.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    // Cookie is handled by backend or we can just let it expire/be invalid
    // If backend clears it, we don't need to do anything. 
    // Or we can call an endpoint.
    // For now, just doing nothing locally as the token is in httpOnly cookie usually?
    // If it's not httpOnly, we can clear it. 
    // But the user said "backend is able to set the token", implying backend handles it.
    // Usually logout involves calling the backend.
    await client.post('/auth/logout');
  },

  async getMe() {
    const response = await client.get('/auth/me');
    return response.data;
  }
};

// Stocks API
export const stocksApi = {
  async fetchStocks(): Promise<Stock[]> {
    const response = await client.get<{ success: boolean; data: Stock[] }>('/stocks');
    return response.data.data;
  },

  async fetchStockBySymbol(symbol: string): Promise<StockDetail> {
    const response = await client.get<{ success: boolean; data: StockDetail }>(`/stocks/${symbol}`);
    return response.data.data;
  },

  async fetchStockPriceHistory(symbol: string): Promise<StockPricePoint[]> {
    const response = await client.get<{ success: boolean; data: StockPricePoint[] }>(`/stocks/${symbol}/history`);
    return response.data.data;
  },
};

// Portfolio API
export const portfolioApi = {
  async fetchPortfolioSummary(): Promise<PortfolioSummary> {
    const response = await client.get<{ success: boolean; data: PortfolioSummary }>('/portfolio');
    return response.data.data;
  },
};

// Orders API
export const ordersApi = {
  async fetchOrders(): Promise<Order[]> {
    const response = await client.get<{ success: boolean; data: Order[] }>('/orders');
    return response.data.data;
  },

  async createOrder(order: CreateOrderRequest): Promise<CreateOrderResponse> {
    const response = await client.post<CreateOrderResponse>('/orders', order);
    return response.data;
  },
};

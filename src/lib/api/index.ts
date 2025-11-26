import { client } from './client';
import type {
  Stock,
  StockDetail,
  Index,
  PortfolioSummary,
  Order,
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  StockPricePoint,
  WatchlistResponse,
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
  fetchStocks: async (): Promise<Stock[]> => {
    const response = await client.get<{ success: boolean; data: Stock[] }>('/stocks');
    return response.data.data;
  },

  fetchStockBySymbol: async (symbol: string): Promise<StockDetail> => {
    const response = await client.get<{ success: boolean; data: StockDetail }>(`/stocks/${symbol}`);
    return response.data.data;
  },

  fetchStockPriceHistory: async (symbol: string): Promise<StockPricePoint[]> => {
    const response = await client.get<{ success: boolean; data: StockPricePoint[] }>(`/stocks/${symbol}/history`);
    return response.data.data;
  },

  fetchMostBoughtStocks: async (): Promise<Stock[]> => {
    const response = await client.get<{ success: boolean; data: Stock[] }>('/stocks/most-bought');
    return response.data.data;
  },

  fetchGainers: async (): Promise<Stock[]> => {
    const response = await client.get<{ success: boolean; data: Stock[] }>('/stocks/gainers');
    return response.data.data;
  },

  fetchLosers: async (): Promise<Stock[]> => {
    const response = await client.get<{ success: boolean; data: Stock[] }>('/stocks/losers');
    return response.data.data;
  },

  fetchVolumeShockers: async (): Promise<Stock[]> => {
    const response = await client.get<{ success: boolean; data: Stock[] }>('/stocks/volume-shockers');
    return response.data.data;
  },
};

// Indices API
export const indicesApi = {
  fetchIndices: async (): Promise<Index[]> => {
    const response = await client.get<{ success: boolean; data: Index[] }>('/indices');
    return response.data.data;
  },

  fetchIndexBySymbol: async (symbol: string): Promise<Index> => {
    const response = await client.get<{ success: boolean; data: Index }>(`/indices/${symbol}`);
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

// Watchlist API
export const watchlistApi = {
  async getWatchlist(): Promise<string[]> {
    const response = await client.get<WatchlistResponse>('/watchlist');
    return response.data.data.symbols;
  },

  async addToWatchlist(symbol: string): Promise<void> {
    await client.post('/watchlist/add', { symbol });
  },

  async removeFromWatchlist(symbol: string): Promise<void> {
    await client.post('/watchlist/remove', { symbol });
  },
};

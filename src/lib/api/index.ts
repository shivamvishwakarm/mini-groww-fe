import axios from 'axios';
import type { Stock, StockDetail, PortfolioSummary, Order, LoginResponse, CreateOrderRequest, CreateOrderResponse } from '../types';
import { MOCK_STOCKS, MOCK_STOCK_DETAILS, MOCK_PORTFOLIO_SUMMARY, MOCK_ORDERS } from './mockData';

// Simulated API base URL (will be replaced with real endpoint later)
// const API_BASE_URL = 'http://localhost:3000/api';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    await delay(500);
    
    // Mock validation
    if (!email || !password) {
      return {
        success: false,
        token: '',
        user: { id: '', email: '', name: '' },
        message: 'Invalid email or password',
      };
    }

    return {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 'user-1',
        email,
        name: email.split('@')[0],
      },
      message: 'Login successful',
    };
  },

  async logout(): Promise<void> {
    await delay(300);
  },
};

// Stocks API
export const stocksApi = {
  async fetchStocks(): Promise<Stock[]> {
    await delay(600);
    return MOCK_STOCKS;
  },

  async fetchStockBySymbol(symbol: string): Promise<StockDetail> {
    await delay(500);
    const stock = MOCK_STOCK_DETAILS[symbol];
    if (!stock) {
      throw new Error(`Stock ${symbol} not found`);
    }
    return stock;
  },

  async fetchStockPriceHistory(symbol: string) {
    await delay(400);
    const stock = MOCK_STOCK_DETAILS[symbol];
    if (!stock) {
      throw new Error(`Stock ${symbol} not found`);
    }
    return stock.priceHistory;
  },
};

// Portfolio API
export const portfolioApi = {
  async fetchPortfolioSummary(): Promise<PortfolioSummary> {
    await delay(700);
    return MOCK_PORTFOLIO_SUMMARY;
  },
};

// Orders API
export const ordersApi = {
  async fetchOrders(): Promise<Order[]> {
    await delay(600);
    return MOCK_ORDERS;
  },

  async createOrder(order: CreateOrderRequest): Promise<CreateOrderResponse> {
    await delay(800);

    // Validation
    if (!order.symbol || !order.side || order.quantity <= 0 || order.price <= 0) {
      return {
        success: false,
        orderId: '',
        message: 'Invalid order parameters',
      };
    }

    // Simulate successful order creation
    return {
      success: true,
      orderId: 'order-' + Date.now(),
      message: `${order.side} order for ${order.quantity} shares of ${order.symbol} created successfully`,
    };
  },
};

// This will be used later to replace mock APIs with real ones
export const createApiClient = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

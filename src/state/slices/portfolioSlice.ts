import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Holding } from '@/lib/types';

interface PortfolioState {
  holdings: Holding[];
  totalValue: number;
  totalInvested: number;
  totalGain: number;
  totalGainPercent: number;
  cash: number;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  holdings: [],
  totalValue: 0,
  totalInvested: 0,
  totalGain: 0,
  totalGainPercent: 0,
  cash: 100000,
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolioLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHoldings: (state, action: PayloadAction<Holding[]>) => {
      state.holdings = action.payload;
    },
    updatePortfolioTotals: (
      state,
      action: PayloadAction<{
        totalValue: number;
        totalInvested: number;
        totalGain: number;
        totalGainPercent: number;
        cash: number;
      }>
    ) => {
      state.totalValue = action.payload.totalValue;
      state.totalInvested = action.payload.totalInvested;
      state.totalGain = action.payload.totalGain;
      state.totalGainPercent = action.payload.totalGainPercent;
      state.cash = action.payload.cash;
    },
    addHolding: (state, action: PayloadAction<Holding>) => {
      const existing = state.holdings.find((h: Holding) => h.symbol === action.payload.symbol);
      if (existing) {
        const totalQuantity = existing.quantity + action.payload.quantity;
        const totalCost = (existing.avgBuyPrice * existing.quantity) + (action.payload.avgBuyPrice * action.payload.quantity);
        existing.avgBuyPrice = totalCost / totalQuantity;
        existing.quantity = totalQuantity;
      } else {
        state.holdings.push(action.payload);
      }
    },
    removeHolding: (state, action: PayloadAction<string>) => {
      state.holdings = state.holdings.filter((h: Holding) => h.symbol !== action.payload);
    },
    setPortfolioError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPortfolioLoading,
  setHoldings,
  updatePortfolioTotals,
  addHolding,
  removeHolding,
  setPortfolioError,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PriceUpdate {
    symbol: string;
    price: number;
    changePercent: number;
}

interface PriceHistoryPoint {
    price: number;
    timestamp: string;
}

interface MarketState {
    prices: Record<string, { price: number; changePercent: number }>;
    history: Record<string, PriceHistoryPoint[]>;
    connected: boolean;
}

const initialState: MarketState = {
    prices: {},
    history: {},
    connected: false,
};

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        updatePrices: (state, action: PayloadAction<PriceUpdate[]>) => {
            action.payload.forEach((update) => {
                state.prices[update.symbol] = {
                    price: update.price,
                    changePercent: update.changePercent,
                };

                // Append to history for real-time chart updates
                if (!state.history[update.symbol]) {
                    state.history[update.symbol] = [];
                }
                state.history[update.symbol].push({
                    price: update.price,
                    timestamp: new Date().toISOString(),
                });

                // Keep only last 100 points to prevent memory issues
                if (state.history[update.symbol].length > 100) {
                    state.history[update.symbol] = state.history[update.symbol].slice(-100);
                }
            });
        },
        setPriceHistory: (state, action: PayloadAction<{ symbol: string; history: PriceHistoryPoint[] }>) => {
            state.history[action.payload.symbol] = action.payload.history;
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        clearPrices: (state) => {
            state.prices = {};
        },
    },
});

export const { updatePrices, setPriceHistory, setConnected, clearPrices } = marketSlice.actions;
export default marketSlice.reducer;

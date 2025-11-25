import { io, type Socket } from 'socket.io-client';
import { store } from '@/state/store';
import { updatePrices, setConnected, setPriceHistory } from '@/state/slices/marketSlice';
import { config } from '@/config/env';

let socket: Socket | null = null;

export const initializeSocket = () => {
    if (socket) {
        console.log('Socket already initialized');
        return socket;
    }

    // Connect to WebSocket server
    socket = io(`${config.apiBaseUrl}`, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
    });

    // Connection event handlers
    socket.on('connect', () => {
        // console.log('WebSocket connected:', socket?.id);
        store.dispatch(setConnected(true));
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        store.dispatch(setConnected(false));
    });

    socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        store.dispatch(setConnected(false));
    });

    // Listen for price history (sent after subscribe)
    socket.on('priceHistory', (data: { symbol: string; history: Array<{ price: number; timestamp: string }> }) => {
        // console.log('Received price history for', data.symbol, ':', data.history.length, 'points');
        store.dispatch(setPriceHistory(data));
    });

    // Listen for live price updates
    socket.on('priceUpdate', (data: { symbol: string; price: number; changePercent: number; timestamp: string }) => {
        // console.log('Received price update:', data);
        store.dispatch(updatePrices([{ symbol: data.symbol, price: data.price, changePercent: data.changePercent }]));
    });

    // Listen for subscription confirmations
    socket.on('subscribed', (_data: { symbols: string[] }) => {
        // console.log('Subscribed to:', data.symbols);
    });

    socket.on('unsubscribed', (_data: { symbols: string[] }) => {
        // console.log('Unsubscribed from:', data.symbols);
    });

    socket.on('error', (error: { message: string }) => {
        console.error('WebSocket error:', error.message);
    });

    return socket;
};

export const subscribeToStock = (symbol: string) => {
    if (!socket) {
        console.warn('Socket not initialized, cannot subscribe');
        return;
    }
    console.log('Subscribing to stock:', symbol);
    socket.emit('subscribe', { symbols: [symbol] });
};

export const subscribeToStocks = (symbols: string[]) => {
    if (!socket) {
        console.warn('Socket not initialized, cannot subscribe');
        return;
    }
    // console.log('Subscribing to stocks:', symbols);
    socket.emit('subscribe', { symbols });
};

export const unsubscribeFromStock = (symbol: string) => {
    if (!socket) {
        console.warn('Socket not initialized, cannot unsubscribe');
        return;
    }
    // console.log('Unsubscribing from stock:', symbol);
    socket.emit('unsubscribe', { symbols: [symbol] });
};

export const unsubscribeFromStocks = (symbols: string[]) => {
    if (!socket) {
        console.warn('Socket not initialized, cannot unsubscribe');
        return;
    }
    // console.log('Unsubscribing from stocks:', symbols);
    socket.emit('unsubscribe', { symbols });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        store.dispatch(setConnected(false));
    }
};

export const getSocket = () => socket;

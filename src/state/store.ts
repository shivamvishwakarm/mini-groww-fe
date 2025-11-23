import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import portfolioReducer from './slices/portfolioSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    portfolio: portfolioReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

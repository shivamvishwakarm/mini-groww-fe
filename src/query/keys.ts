export const queryKeys = {
  stocks: {
    all: ['stocks'] as const,
    list: () => [...queryKeys.stocks.all, 'list'] as const,
    detail: (symbol: string) => [...queryKeys.stocks.all, 'detail', symbol] as const,
    priceHistory: (symbol: string) => [...queryKeys.stocks.all, 'priceHistory', symbol] as const,
    mostBought: () => [...queryKeys.stocks.all, 'most-bought'] as const,
    gainers: () => [...queryKeys.stocks.all, 'gainers'] as const,
    losers: () => [...queryKeys.stocks.all, 'losers'] as const,
    volumeShockers: () => [...queryKeys.stocks.all, 'volume-shockers'] as const,
  },
  indices: {
    all: ['indices'] as const,
    list: () => [...queryKeys.indices.all, 'list'] as const,
    detail: (symbol: string) => [...queryKeys.indices.all, 'detail', symbol] as const,
  },
  portfolio: {
    all: ['portfolio'] as const,
    summary: () => [...queryKeys.portfolio.all, 'summary'] as const,
  },
  orders: {
    all: ['orders'] as const,
    list: () => [...queryKeys.orders.all, 'list'] as const,
  },
  auth: {
    all: ['auth'] as const,
    login: () => [...queryKeys.auth.all, 'login'] as const,
  },
  watchlist: {
    all: ['watchlist'] as const,
    list: () => [...queryKeys.watchlist.all, 'list'] as const,
  },
};

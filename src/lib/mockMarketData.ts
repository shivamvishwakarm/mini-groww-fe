// Mock data for Groww-style dashboard

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo?: string;
}

export interface MarketMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  chartData: number[];
  logo?: string;
}

export interface ProductTool {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  badgeColor?: 'green' | 'blue' | 'purple';
}

export const marketIndices: MarketIndex[] = [
  {
    name: 'NIFTY',
    value: 26088.15,
    change: -124.0,
    changePercent: -0.47,
  },
  {
    name: 'SENSEX',
    value: 85231.92,
    change: -400.76,
    changePercent: -0.47,
  },
  {
    name: 'BANKNIFTY',
    value: 58867.70,
    change: -480.0,
    changePercent: -0.81,
  },
  {
    name: 'MIDCAPNIFTY',
    value: 13851.35,
    change: -140.85,
    changePercent: -1.01,
  },
  {
    name: 'FINNIFTY',
    value: 27.66,
    change: 0.0,
    changePercent: 0.0,
  },
];

export const popularStocks: Stock[] = [
  {
    symbol: 'PHYSICSWALL',
    name: 'Physicswallah',
    price: 134.31,
    change: -7.62,
    changePercent: -5.37,
  },
  {
    symbol: 'MAGELLAN',
    name: 'Magellan Cloud',
    price: 61.08,
    change: 7.56,
    changePercent: 14.13,
  },
  {
    symbol: 'AZTEC',
    name: 'Aztec Lifesciences',
    price: 829.00,
    change: 94.85,
    changePercent: 12.94,
  },
  {
    symbol: 'SUZLON',
    name: 'Suzlon Energy',
    price: 55.10,
    change: -1.60,
    changePercent: -2.82,
  },
];

export const marketMovers: MarketMover[] = [
  {
    symbol: 'MARUTI',
    name: 'Maruti Suzuki',
    price: 15077.00,
    change: 178.00,
    changePercent: 1.11,
    volume: 586351,
    chartData: [14800, 14850, 14900, 14950, 15000, 15050, 15077],
  },
  {
    symbol: 'MAXHEALTH',
    name: 'Max Healthcare',
    price: 1181.10,
    change: 12.20,
    changePercent: 1.04,
    volume: 2258525,
    chartData: [1160, 1165, 1170, 1175, 1178, 1180, 1181],
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: 2456.80,
    change: 45.30,
    changePercent: 1.88,
    volume: 8945621,
    chartData: [2400, 2410, 2420, 2430, 2440, 2450, 2456],
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3842.50,
    change: -23.40,
    changePercent: -0.61,
    volume: 1234567,
    chartData: [3870, 3865, 3860, 3855, 3850, 3845, 3842],
  },
  {
    symbol: 'INFY',
    name: 'Infosys',
    price: 1523.75,
    change: 18.90,
    changePercent: 1.26,
    volume: 5678901,
    chartData: [1500, 1505, 1510, 1515, 1520, 1522, 1523],
  },
];

export const productsTools: ProductTool[] = [
  {
    id: 'ipo',
    name: 'IPO',
    icon: '📊',
    badge: '4 open',
    badgeColor: 'green',
  },
  {
    id: 'bonds',
    name: 'Bonds',
    icon: '📈',
    badge: '1 open',
    badgeColor: 'green',
  },
  {
    id: 'etf-screener',
    name: 'ETF Screener',
    icon: '🔍',
  },
  {
    id: 'intraday-screener',
    name: 'Intraday Screener',
    icon: '⚡',
  },
];

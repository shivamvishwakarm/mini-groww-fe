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
  badgeColor?: 'green' | 'blue' | 'purple' | 'red' | 'orange';
  category?: 'ipo' | 'bond' | 'etf' | 'screener' | 'other';
  description?: string;
}

export interface IPO {
  symbol: string;
  name: string;
  logo?: string;
  priceBand: string;
  lotSize: number;
  minInvestment: number;
  issueSize: string;
  subscriptionDates: string;
  listingDate: string;
  status: 'upcoming' | 'open' | 'closed';
  subscriptionStatus?: number; // e.g., 2.5x subscribed
}

export interface Bond {
  id: string;
  issuer: string;
  name: string;
  yield: number;
  minInvestment: number;
  rating: 'AAA' | 'AA+' | 'AA' | 'A+' | 'A' | 'BBB';
  maturityDate: string;
  type: 'Government' | 'Corporate' | 'SGB';
  interestPayment: 'Monthly' | 'Quarterly' | 'Annually' | 'Maturity';
}

export interface ETF {
  symbol: string;
  name: string;
  nav: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  expenseRatio: number;
  aum: string; // e.g., "₹500 Cr"
  category: 'Index' | 'Gold' | 'Debt' | 'International' | 'Sectoral';
}

export interface Screener {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const productsTools: ProductTool[] = [
  {
    id: 'ipo',
    name: 'IPO',
    icon: '📊',
    badge: '4 open',
    badgeColor: 'green',
    category: 'ipo',
    description: 'Apply for new company listings',
  },
  {
    id: 'bonds',
    name: 'Bonds',
    icon: '📜', // Changed icon for better representation
    badge: 'New',
    badgeColor: 'blue',
    category: 'bond',
    description: 'Invest in corporate & govt bonds',
  },
  {
    id: 'etf',
    name: 'ETFs',
    icon: '🧺',
    category: 'etf',
    description: 'Exchange Traded Funds',
  },
  {
    id: 'sgb',
    name: 'SGB',
    icon: '🥇',
    badge: 'Open',
    badgeColor: 'orange',
    category: 'bond',
    description: 'Sovereign Gold Bonds',
  },
  {
    id: 'futures-options',
    name: 'F&O',
    icon: '⚡',
    category: 'other',
    description: 'Futures & Options trading',
  },
  {
    id: 'intraday',
    name: 'Intraday',
    icon: '⏱️',
    category: 'screener',
    description: 'Day trading stocks',
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    icon: '💰',
    category: 'other',
    description: 'Direct mutual funds',
  },
  {
    id: 'credit',
    name: 'Credit',
    icon: '💳',
    category: 'other',
    description: 'Loans & Credit cards',
  },
];

export const ipos: IPO[] = [
  {
    symbol: 'OLA',
    name: 'Ola Electric Mobility',
    priceBand: '₹72 - ₹76',
    lotSize: 195,
    minInvestment: 14040,
    issueSize: '₹6,145 Cr',
    subscriptionDates: '2 Aug - 6 Aug',
    listingDate: '9 Aug 2024',
    status: 'open',
    subscriptionStatus: 4.3,
  },
  {
    symbol: 'FIRSTCRY',
    name: 'Brainbees Solutions (FirstCry)',
    priceBand: '₹440 - ₹465',
    lotSize: 32,
    minInvestment: 14080,
    issueSize: '₹4,193 Cr',
    subscriptionDates: '6 Aug - 8 Aug',
    listingDate: '13 Aug 2024',
    status: 'open',
    subscriptionStatus: 1.2,
  },
  {
    symbol: 'UNIBIC',
    name: 'Unibic Foods India',
    priceBand: '₹120 - ₹125',
    lotSize: 120,
    minInvestment: 14400,
    issueSize: '₹800 Cr',
    subscriptionDates: '10 Aug - 12 Aug',
    listingDate: '18 Aug 2024',
    status: 'upcoming',
  },
  {
    symbol: 'SWIGGY',
    name: 'Swiggy Limited',
    priceBand: '₹350 - ₹370',
    lotSize: 40,
    minInvestment: 14000,
    issueSize: '₹10,000 Cr',
    subscriptionDates: '15 Sep - 18 Sep',
    listingDate: '25 Sep 2024',
    status: 'upcoming',
  },
  {
    symbol: 'IXIGO',
    name: 'Le Travenues Technology (Ixigo)',
    priceBand: '₹88 - ₹93',
    lotSize: 161,
    minInvestment: 14168,
    issueSize: '₹740 Cr',
    subscriptionDates: '10 Jun - 12 Jun',
    listingDate: '18 Jun 2024',
    status: 'closed',
    subscriptionStatus: 98.3,
  },
  {
    symbol: 'AWFIS',
    name: 'Awfis Space Solutions',
    priceBand: '₹364 - ₹383',
    lotSize: 39,
    minInvestment: 14196,
    issueSize: '₹598 Cr',
    subscriptionDates: '22 May - 27 May',
    listingDate: '30 May 2024',
    status: 'closed',
    subscriptionStatus: 108.4,
  },
];

export const bonds: Bond[] = [
  {
    id: 'b1',
    issuer: 'RBI',
    name: 'RBI Floating Rate Savings Bond',
    yield: 8.05,
    minInvestment: 1000,
    rating: 'AAA',
    maturityDate: '01 Jan 2031',
    type: 'Government',
    interestPayment: 'Annually',
  },
  {
    id: 'b2',
    issuer: 'Piramal',
    name: 'Piramal Capital & Housing Finance',
    yield: 9.25,
    minInvestment: 10000,
    rating: 'AA',
    maturityDate: '15 Jul 2026',
    type: 'Corporate',
    interestPayment: 'Quarterly',
  },
  {
    id: 'b3',
    issuer: 'Navi',
    name: 'Navi Finserv Limited',
    yield: 10.40,
    minInvestment: 10000,
    rating: 'A',
    maturityDate: '23 May 2025',
    type: 'Corporate',
    interestPayment: 'Monthly',
  },
  {
    id: 'b4',
    issuer: 'NHAI',
    name: 'NHAI Tax Free Bond',
    yield: 6.25,
    minInvestment: 5000,
    rating: 'AAA',
    maturityDate: '11 Jan 2030',
    type: 'Government',
    interestPayment: 'Annually',
  },
  {
    id: 'b5',
    issuer: 'Tata Capital',
    name: 'Tata Capital Financial Services',
    yield: 8.75,
    minInvestment: 10000,
    rating: 'AAA',
    maturityDate: '10 Sep 2028',
    type: 'Corporate',
    interestPayment: 'Annually',
  },
  {
    id: 'b6',
    issuer: 'Govt of India',
    name: 'Sovereign Gold Bond 2024-25 Series I',
    yield: 2.50,
    minInvestment: 6250, // Approx 1gm gold price
    rating: 'AAA',
    maturityDate: '20 Jun 2032',
    type: 'SGB',
    interestPayment: 'Annually',
  },
];

export const etfs: ETF[] = [
  {
    symbol: 'NIFTYBEES',
    name: 'Nippon India ETF Nifty BeES',
    nav: 275.45,
    returns1Y: 24.5,
    returns3Y: 15.2,
    returns5Y: 14.8,
    expenseRatio: 0.05,
    aum: '₹15,400 Cr',
    category: 'Index',
  },
  {
    symbol: 'GOLDBEES',
    name: 'Nippon India ETF Gold BeES',
    nav: 61.20,
    returns1Y: 18.4,
    returns3Y: 12.1,
    returns5Y: 13.5,
    expenseRatio: 0.79,
    aum: '₹8,900 Cr',
    category: 'Gold',
  },
  {
    symbol: 'BANKBEES',
    name: 'Nippon India ETF Bank BeES',
    nav: 512.30,
    returns1Y: 12.8,
    returns3Y: 16.5,
    returns5Y: 11.2,
    expenseRatio: 0.18,
    aum: '₹12,100 Cr',
    category: 'Sectoral',
  },
  {
    symbol: 'ITBEES',
    name: 'Nippon India ETF Nifty IT',
    nav: 42.15,
    returns1Y: 28.9,
    returns3Y: 8.4,
    returns5Y: 21.3,
    expenseRatio: 0.22,
    aum: '₹2,300 Cr',
    category: 'Sectoral',
  },
  {
    symbol: 'LIQUIDBEES',
    name: 'Nippon India ETF Liquid BeES',
    nav: 1000.05,
    returns1Y: 6.8,
    returns3Y: 5.4,
    returns5Y: 5.1,
    expenseRatio: 0.65,
    aum: '₹10,500 Cr',
    category: 'Debt',
  },
  {
    symbol: 'MAFANG',
    name: 'Mirae Asset NYSE FANG+ ETF',
    nav: 98.40,
    returns1Y: 45.2,
    returns3Y: 22.1,
    returns5Y: 28.5,
    expenseRatio: 0.63,
    aum: '₹1,800 Cr',
    category: 'International',
  },
  {
    symbol: 'MON100',
    name: 'Motilal Oswal Nasdaq 100 ETF',
    nav: 145.60,
    returns1Y: 38.7,
    returns3Y: 18.9,
    returns5Y: 24.2,
    expenseRatio: 0.58,
    aum: '₹4,200 Cr',
    category: 'International',
  },
];

export const screeners: Screener[] = [
  {
    id: 'intraday',
    name: 'Intraday Screener',
    description: 'Find stocks for day trading based on volatility and volume',
    icon: '⚡',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    id: 'value',
    name: 'Value Stocks',
    description: 'Undervalued companies with strong fundamentals',
    icon: '💎',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'high-growth',
    name: 'High Growth',
    description: 'Companies with consistent revenue and profit growth',
    icon: '🚀',
    color: 'bg-green-50 text-green-600',
  },
  {
    id: 'dividend',
    name: 'Dividend Yield',
    description: 'Stocks with high dividend payout history',
    icon: '💰',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    id: '52-week-high',
    name: 'Near 52W High',
    description: 'Stocks trading near their 52-week high price',
    icon: '📈',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    id: 'oversold',
    name: 'Oversold Stocks',
    description: 'Stocks with RSI < 30 indicating potential reversal',
    icon: '📉',
    color: 'bg-red-50 text-red-600',
  },
];

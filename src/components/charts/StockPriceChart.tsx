import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface PriceDataPoint {
  price: number;
  date?: string;
  timestamp?: string;
}

interface StockPriceChartProps {
  data: PriceDataPoint[];
  symbol: string;
}

export function StockPriceChart({ data, symbol }: StockPriceChartProps) {
  // Limit to last 50 data points and transform for chart
  const limitedData = data.slice(-50);

  const chartData = limitedData.map((point) => {
    const timestamp = point.timestamp ? new Date(point.timestamp) : new Date();
    return {
      ...point,
      time: timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      price: point.price,
    };
  });

  return (
    <Card className="border border-gray-200 border-none shadow-none">
      <CardHeader>
        <CardTitle>{symbol} Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              stroke="#666"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#666"
              tick={{ fontSize: 11 }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              formatter={(value) => `₹${Number(value).toFixed(2)}`}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

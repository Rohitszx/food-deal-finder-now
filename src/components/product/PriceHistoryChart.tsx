
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Platform {
  name: string;
  priceHistory: number[];
}

interface PriceHistoryChartProps {
  platforms: Platform[];
}

const PriceHistoryChart = ({ platforms }: PriceHistoryChartProps) => {
  // Transform data for Recharts
  const chartData = platforms[0].priceHistory.map((_, index) => {
    const dataPoint: Record<string, any> = {
      day: `Day ${index + 1}`,
    };
    
    platforms.forEach(platform => {
      dataPoint[platform.name] = platform.priceHistory[index];
    });
    
    return dataPoint;
  });

  // Colors for each platform
  const colors = ['#FF6347', '#4CAF50', '#33C3F0'];
  
  return (
    <div className="p-4 bg-muted rounded-b-lg h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          {platforms.map((platform, index) => (
            <Line
              key={platform.name}
              type="monotone"
              dataKey={platform.name}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;

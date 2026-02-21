import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

// Definicja struktury danych przychodzących z Pythona
export interface ChartDataPoint {
  date: string;    // Format "YYYY-MM-DD"
  Mind?: number;
  Physical?: number;
  Social?: number;
}

interface StatsChartProps {
  data: ChartDataPoint[];
}

const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 w-full h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold text-lg">Analiza Postępów EXP</h3>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Ostatnie dni</span>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {/* Siatka w tle */}
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          
          {/* Oś X - Daty */}
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.split('-').slice(1).join('/')} // Zamienia 2026-02-16 na 02/16
          />
          
          {/* Oś Y - Punkty EXP */}
          <YAxis 
            stroke="#9ca3af" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} XP`}
          />
          
          {/* Tooltip po najechaniu myszką */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
          />
          
          <Legend verticalAlign="top" height={36} />

          {/* Linie dla poszczególnych kategorii */}
          <Line 
            name="Umysł (Mind)"
            type="monotone" 
            dataKey="Mind" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2 }} 
            activeDot={{ r: 8 }} 
            connectNulls 
          />
          
          <Line 
            name="Fizyczne (Physical)"
            type="monotone" 
            dataKey="Physical" 
            stroke="#ef4444" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#ef4444', strokeWidth: 2 }} 
            connectNulls 
          />
          
          <Line 
            name="Społeczne (Social)"
            type="monotone" 
            dataKey="Social" 
            stroke="#10b981" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#10b981', strokeWidth: 2 }} 
            connectNulls 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
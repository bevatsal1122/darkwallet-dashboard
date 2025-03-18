
import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import TimeframeSelector from "./TimeframeSelector";
import { motion } from "framer-motion";

interface PerformanceChartProps {
  className?: string;
}

const generateChartData = (timeframe: string) => {
  // Mock data generation based on timeframe
  const points = timeframe === "1D" ? 24 : timeframe === "1W" ? 7 : 30;
  
  return Array.from({ length: points }, (_, i) => {
    const base = 10000 + Math.random() * 5000;
    const value = base + (Math.sin(i / (points / 6)) * 2000);
    
    let name;
    if (timeframe === "1D") {
      name = `${i}:00`;
    } else if (timeframe === "1W") {
      name = `Day ${i + 1}`;
    } else {
      name = `Day ${i + 1}`;
    }
    
    return {
      name,
      value: Math.round(value * 100) / 100,
    };
  });
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ className = "" }) => {
  const timeframeOptions = [
    { id: "1D", label: "1 Day" },
    { id: "1W", label: "1 Week" },
    { id: "1M", label: "1 Month" },
  ];

  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [chartData, setChartData] = useState(generateChartData(selectedTimeframe));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading data
    setTimeout(() => {
      setChartData(generateChartData(selectedTimeframe));
      setIsLoading(false);
    }, 500);
  }, [selectedTimeframe]);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
  };

  return (
    <motion.div 
      className={`glass-panel p-4 rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Portfolio Performance</h2>
        <TimeframeSelector 
          options={timeframeOptions} 
          onChange={handleTimeframeChange} 
        />
      </div>

      <div className="w-full h-[300px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse-soft flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mb-2"></div>
              <span className="text-sm text-muted-foreground">Loading data...</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                width={60}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--accent))' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--accent))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default PerformanceChart;

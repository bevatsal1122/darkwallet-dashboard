
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface AssetAllocationChartProps {
  className?: string;
}

const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ className = "" }) => {
  // Mock data for the pie chart focused on NBA markets
  const data = [
    { name: "Game Winners", value: 45, color: "#8B5CF6" },
    { name: "Player Points", value: 25, color: "#0EA5E9" },
    { name: "Team Totals", value: 20, color: "#F97316" },
    { name: "Quarters/Halves", value: 10, color: "#D946EF" },
  ];

  const chartConfig = {
    "Game Winners": { color: "#8B5CF6" },
    "Player Points": { color: "#0EA5E9" },
    "Team Totals": { color: "#F97316" },
    "Quarters/Halves": { color: "#D946EF" },
  };

  return (
    <motion.div 
      className={`glass-panel p-4 rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4">NBA Market Allocation</h2>
      
      <div className="w-full h-[300px]">
        <ChartContainer config={chartConfig} className="h-full">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8B5CF6"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border/50 bg-background p-2 shadow-md">
                      <p className="font-medium">{payload[0].name}</p>
                      <p className="text-sm text-muted-foreground">
                        {payload[0].value}% of portfolio
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value, entry, index) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </div>
    </motion.div>
  );
};

export default AssetAllocationChart;

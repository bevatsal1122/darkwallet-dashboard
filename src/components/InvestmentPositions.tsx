
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface Position {
  id: string;
  market: string;
  position: string;
  allocation: number;
  currentValue: number;
  changePercent: number;
  expirationDate: string;
}

interface InvestmentPositionsProps {
  className?: string;
}

const InvestmentPositions: React.FC<InvestmentPositionsProps> = ({ className = "" }) => {
  // Mock data for positions
  const positions: Position[] = [
    {
      id: "pos-1",
      market: "Will Lakers beat Bulls in Game 7?",
      position: "YES",
      allocation: 35,
      currentValue: 4520.68,
      changePercent: 12.4,
      expirationDate: "May 15, 2024"
    },
    {
      id: "pos-2",
      market: "Will Warriors win next match?",
      position: "YES",
      allocation: 25,
      currentValue: 3267.15,
      changePercent: 8.7,
      expirationDate: "May 20, 2024"
    },
    {
      id: "pos-3",
      market: "Will Celtics reach NBA finals?",
      position: "NO",
      allocation: 15,
      currentValue: 1842.30,
      changePercent: -4.2,
      expirationDate: "Jun 5, 2024"
    },
    {
      id: "pos-4",
      market: "Will LeBron score 30+ points?",
      position: "YES",
      allocation: 25,
      currentValue: 3156.45,
      changePercent: 15.8,
      expirationDate: "May 12, 2024"
    }
  ];

  return (
    <motion.div 
      className={`glass-panel p-4 rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Active Positions</h2>
        <span className="text-sm text-muted-foreground">NBA Sports Markets</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {positions.map((position) => (
          <Card key={position.id} className="overflow-hidden border-0 bg-card/50 hover:bg-card/80 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-base mb-1">{position.market}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${position.position === "YES" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {position.position}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} />
                      {position.expirationDate}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center justify-end gap-1 text-sm ${position.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {position.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(position.changePercent)}%
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/30">
                <div>
                  <p className="text-xs text-muted-foreground">Allocation</p>
                  <p className="font-medium">{position.allocation}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Value</p>
                  <p className="font-medium">${position.currentValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default InvestmentPositions;

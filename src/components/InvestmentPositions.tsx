
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, TrendingDown, BarChart3, Percent } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Position {
  id: string;
  market: string;
  position: string;
  allocation: number;
  currentValue: number;
  changePercent: number;
  expirationDate: string;
  odds: string;
  probability: number;
}

interface InvestmentPositionsProps {
  className?: string;
}

const InvestmentPositions: React.FC<InvestmentPositionsProps> = ({ className = "" }) => {
  // Enhanced mock data for positions
  const positions: Position[] = [
    {
      id: "pos-1",
      market: "Will Lakers beat Bulls in Game 7?",
      position: "YES",
      allocation: 35,
      currentValue: 4520.68,
      changePercent: 12.4,
      expirationDate: "May 15, 2024",
      odds: "+125",
      probability: 68
    },
    {
      id: "pos-2",
      market: "Will Warriors win next match?",
      position: "YES",
      allocation: 25,
      currentValue: 3267.15,
      changePercent: 8.7,
      expirationDate: "May 20, 2024",
      odds: "-110",
      probability: 72
    },
    {
      id: "pos-3",
      market: "Will Celtics reach NBA finals?",
      position: "NO",
      allocation: 15,
      currentValue: 1842.30,
      changePercent: -4.2,
      expirationDate: "Jun 5, 2024",
      odds: "+180",
      probability: 45
    },
    {
      id: "pos-4",
      market: "Will LeBron score 30+ points?",
      position: "YES",
      allocation: 25,
      currentValue: 3156.45,
      changePercent: 15.8,
      expirationDate: "May 12, 2024",
      odds: "-150",
      probability: 82
    }
  ];

  const totalInvested = positions.reduce((sum, pos) => sum + pos.currentValue, 0);

  return (
    <motion.div 
      className={`glass-panel p-4 rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Active Positions</h2>
          <p className="text-sm text-muted-foreground">Total: ${totalInvested.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-primary/20 px-2 py-1 rounded-full text-primary-foreground">
            NBA Sports Markets
          </span>
          <span className="flex items-center gap-1 text-sm text-amber-400">
            <Calendar size={14} />
            Next expiry: May 12
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {positions.map((position) => (
          <Collapsible key={position.id} defaultOpen={true} className="w-full">
            <Card className="overflow-hidden border-0 bg-card/50 hover:bg-card/80 transition-all duration-200">
              <CollapsibleTrigger className="w-full text-left">
                <CardContent className="p-4 pb-3 border-b border-border/30">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-base mb-1">{position.market}</h3>
                      <div className="flex items-center gap-2">
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
                </CardContent>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-4 pt-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Allocation</p>
                      <p className="font-medium">{position.allocation}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Current Value</p>
                      <p className="font-medium">${position.currentValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Percent size={12} />
                        AI Confidence
                      </p>
                      <p className="font-medium">{position.probability}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <BarChart3 size={12} />
                        Market Odds
                      </p>
                      <p className="font-medium">{position.odds}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </motion.div>
  );
};

export default InvestmentPositions;

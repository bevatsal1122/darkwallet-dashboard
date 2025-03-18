
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, TrendingDown, BarChart3, Percent, AlertCircle, Clock, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  liquidityScore: number;
  volatility: "high" | "medium" | "low";
  status: "positive" | "negative" | "neutral";
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
      probability: 68,
      liquidityScore: 85,
      volatility: "medium",
      status: "positive"
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
      probability: 72,
      liquidityScore: 78,
      volatility: "low",
      status: "positive"
    },
    {
      id: "pos-3",
      market: "Will Celtics reach finals?",
      position: "NO",
      allocation: 15,
      currentValue: 1842.30,
      changePercent: -4.2,
      expirationDate: "Jun 5, 2024",
      odds: "+180",
      probability: 45,
      liquidityScore: 62,
      volatility: "high",
      status: "negative"
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
      probability: 82,
      liquidityScore: 91,
      volatility: "low",
      status: "positive"
    }
  ];

  const totalInvested = positions.reduce((sum, pos) => sum + pos.currentValue, 0);

  // Helper function to get color based on position status
  const getStatusColor = (status: Position['status']) => {
    switch (status) {
      case 'positive': return 'from-green-500/20 to-green-500/5 border-green-500/30';
      case 'negative': return 'from-red-500/20 to-red-500/5 border-red-500/30';
      case 'neutral': return 'from-blue-500/20 to-blue-500/5 border-blue-500/30';
      default: return '';
    }
  };

  // Helper function to get volatility badge
  const getVolatilityBadge = (volatility: Position['volatility']) => {
    switch (volatility) {
      case 'high': return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">High Volatility</Badge>;
      case 'medium': return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Medium Volatility</Badge>;
      case 'low': return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Low Volatility</Badge>;
      default: return null;
    }
  };

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
            Sports Markets
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
            <Card 
              className={`overflow-hidden border bg-gradient-to-r ${getStatusColor(position.status)} hover:shadow-md transition-all duration-200`}
            >
              <CollapsibleTrigger className="w-full text-left">
                <CardContent className="p-4 pb-3 border-b border-border/30">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-base">{position.market}</h3>
                        {position.status === 'positive' && <AlertCircle size={16} className="text-green-400" />}
                        {position.status === 'negative' && <AlertCircle size={16} className="text-red-400" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${position.position === "YES" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {position.position}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} />
                          {position.expirationDate}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center justify-end gap-1 text-sm font-medium ${position.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {Math.abs(position.changePercent)}%
                    </div>
                  </div>
                </CardContent>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-4 pt-3">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Allocation</p>
                        <p className="font-medium">{position.allocation}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Current Value</p>
                        <p className="font-medium">${position.currentValue.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Target size={12} />
                          AI Confidence: {position.probability}%
                        </p>
                        <p className="text-xs font-medium">{position.probability}%</p>
                      </div>
                      <Progress 
                        value={position.probability} 
                        className="h-2" 
                        indicatorClassName={position.probability > 60 ? "bg-green-500" : position.probability > 40 ? "bg-amber-500" : "bg-red-500"}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <BarChart3 size={12} />
                          Market Odds
                        </p>
                        <p className={`font-medium ${position.odds.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {position.odds}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Percent size={12} />
                          Liquidity Score
                        </p>
                        <p className="font-medium">{position.liquidityScore}/100</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      {getVolatilityBadge(position.volatility)}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${position.status === 'positive' ? 'bg-green-500/20 text-green-400' : position.status === 'negative' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {position.status === 'positive' ? 'Performing Well' : position.status === 'negative' ? 'Underperforming' : 'Neutral'}
                      </span>
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

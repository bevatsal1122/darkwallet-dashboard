
// InvestmentPositions.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Info, 
  CircleDollarSign, 
  BarChart, 
  Droplets 
} from 'lucide-react';
import { cn } from "@/lib/utils";

// Define a type for the investment position
interface Position {
  id: string;
  question: string;
  prediction: 'YES' | 'NO';
  date: string;
  allocation: number;
  currentValue: number;
  aiConfidence: number;
  marketOdds: number;
  liquidityScore: number;
  volatility: 'Low' | 'Medium' | 'High';
  performance: 'Performing Well' | 'Underperforming';
  profitPercentage: number;
}

// Mock function to simulate fetching investment positions
const fetchInvestmentPositions = async (): Promise<Position[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: Position[] = [
        {
          id: "1",
          question: "Will Lakers beat Bulls in Game 7?",
          prediction: "YES",
          date: "May 15, 2024",
          allocation: 35,
          currentValue: 4520.68,
          aiConfidence: 68,
          marketOdds: 125,
          liquidityScore: 85,
          volatility: "Medium",
          performance: "Performing Well",
          profitPercentage: 12.4,
        },
        {
          id: "2",
          question: "Will Warriors win next match?",
          prediction: "YES",
          date: "May 20, 2024",
          allocation: 25,
          currentValue: 3267.15,
          aiConfidence: 72,
          marketOdds: -110,
          liquidityScore: 78,
          volatility: "Low",
          performance: "Performing Well",
          profitPercentage: 8.7,
        },
        {
          id: "3",
          question: "Will Celtics reach finals?",
          prediction: "NO",
          date: "Jun 5, 2024",
          allocation: 15,
          currentValue: 1842.3,
          aiConfidence: 45,
          marketOdds: 180,
          liquidityScore: 62,
          volatility: "High",
          performance: "Underperforming",
          profitPercentage: -4.2,
        },
        {
          id: "4",
          question: "Will LeBron score 30+ points?",
          prediction: "YES",
          date: "May 12, 2024",
          allocation: 25,
          currentValue: 3156.45,
          aiConfidence: 82,
          marketOdds: -150,
          liquidityScore: 91,
          volatility: "Low",
          performance: "Performing Well",
          profitPercentage: 15.8,
        },
      ];
      resolve(mockData);
    }, 500);
  });
};

// Calculate total value of positions
const calculateTotal = (positions: Position[]): string => {
  const total = positions.reduce((sum, position) => sum + position.currentValue, 0);
  return total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Format currency values
const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

interface InvestmentPositionsProps {
  className?: string;
}

const InvestmentPositions: React.FC<InvestmentPositionsProps> = ({ className }) => {
  // Use react-query to fetch investment positions - updated to use object syntax
  const { data: positions, isLoading, isError } = useQuery({
    queryKey: ['investmentPositions'],
    queryFn: fetchInvestmentPositions
  });

  // Handle loading and error states
  if (isLoading) {
    return <p>Loading investment positions...</p>;
  }

  if (isError) {
    return <p>Error loading investment positions.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("glass-panel rounded-xl shadow-lg overflow-hidden w-full max-w-5xl mx-auto", className)}
    >
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Active Positions</h2>
            <p className="text-muted-foreground text-sm">
              Total: {positions && calculateTotal(positions)}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-secondary/80 text-foreground px-3 py-1.5 flex items-center gap-1">
              Sports Markets
            </Badge>
            <Badge variant="outline" className="bg-secondary/80 text-foreground px-3 py-1.5 flex items-center gap-1">
              <Clock className="h-4 w-4" /> Next expiry: May 12
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {positions?.map((position) => (
            <Card 
              key={position.id} 
              className={cn(
                "border overflow-hidden", 
                position.profitPercentage >= 0 
                  ? "bg-[#0F2818]/40 border-emerald-800/30" 
                  : "bg-[#2D1215]/40 border-red-800/30"
              )}
            >
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium">{position.question}</h3>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={cn(
                          "rounded px-2", 
                          position.prediction === "YES" 
                            ? "bg-emerald-500/30 text-emerald-300 hover:bg-emerald-500/40 hover:text-emerald-300" 
                            : "bg-red-500/30 text-red-300 hover:bg-red-500/40 hover:text-red-300"
                        )}>
                          {position.prediction}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {position.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {position.profitPercentage >= 0 ? (
                        <div className="flex items-center text-emerald-400">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-medium">{position.profitPercentage}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <TrendingDown className="h-4 w-4" />
                          <span className="font-medium">{Math.abs(position.profitPercentage)}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Allocation</p>
                      <p className="text-xl font-medium">{position.allocation}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                      <p className="text-xl font-medium">{formatCurrency(position.currentValue)}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">AI Confidence: {position.aiConfidence}%</span>
                      </div>
                      <span className="text-xs">{position.aiConfidence}%</span>
                    </div>
                    <Progress 
                      value={position.aiConfidence} 
                      className="h-2"
                      style={{
                        '--progress-background': position.profitPercentage >= 0 ? '#10B981' : '#F87171',
                      } as React.CSSProperties}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Market Odds</span>
                      </div>
                      <p className={cn(
                        "font-medium", 
                        position.marketOdds > 0 ? "text-emerald-400" : "text-red-400"
                      )}>
                        {position.marketOdds > 0 ? '+' : ''}{position.marketOdds}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Droplets className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Liquidity Score</span>
                      </div>
                      <p className="font-medium">{position.liquidityScore}/100</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Badge variant="outline" className={cn(
                      "px-3 rounded-full",
                      position.volatility === "Low" ? "border-emerald-500/30 text-emerald-400" :
                      position.volatility === "Medium" ? "border-yellow-500/30 text-yellow-400" :
                      "border-red-500/30 text-red-400"
                    )}>
                      {position.volatility} Volatility
                    </Badge>
                    <Badge variant="outline" className={cn(
                      "px-3 rounded-full",
                      position.performance === "Performing Well" 
                        ? "border-emerald-500/30 text-emerald-400" 
                        : "border-red-500/30 text-red-400"
                    )}>
                      {position.performance}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentPositions;

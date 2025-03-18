
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Calendar } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface Trade {
  id: string;
  market: string;
  position: string;
  result: "win" | "loss";
  profitLoss: number;
  date: string;
}

interface PastTradesProps {
  className?: string;
}

const PastTrades: React.FC<PastTradesProps> = ({ className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Mock data for past trades
  const allTrades: Trade[] = [
    {
      id: "trade-1",
      market: "Lakers vs Knicks",
      position: "Lakers Win",
      result: "win",
      profitLoss: 425.32,
      date: "Apr 28, 2024"
    },
    {
      id: "trade-2",
      market: "Warriors vs Suns",
      position: "Warriors Win",
      result: "win",
      profitLoss: 312.45,
      date: "Apr 25, 2024"
    },
    {
      id: "trade-3",
      market: "Celtics vs Bucks",
      position: "Bucks Win",
      result: "loss",
      profitLoss: -215.76,
      date: "Apr 22, 2024"
    },
    {
      id: "trade-4",
      market: "Bulls vs Heat",
      position: "Bulls Win",
      result: "win",
      profitLoss: 178.90,
      date: "Apr 20, 2024"
    },
    {
      id: "trade-5",
      market: "Nets vs 76ers",
      position: "Nets Win",
      result: "loss",
      profitLoss: -320.15,
      date: "Apr 18, 2024"
    },
    {
      id: "trade-6",
      market: "Clippers vs Pelicans",
      position: "Clippers Win",
      result: "win",
      profitLoss: 245.67,
      date: "Apr 16, 2024"
    },
    {
      id: "trade-7",
      market: "Mavericks vs Rockets",
      position: "Mavericks Win",
      result: "win",
      profitLoss: 198.54,
      date: "Apr 14, 2024"
    },
    {
      id: "trade-8",
      market: "Nuggets vs Jazz",
      position: "Jazz Win",
      result: "loss",
      profitLoss: -276.43,
      date: "Apr 12, 2024"
    }
  ];

  // Calculate total pages
  const totalPages = Math.ceil(allTrades.length / itemsPerPage);
  
  // Get current trades
  const indexOfLastTrade = currentPage * itemsPerPage;
  const indexOfFirstTrade = indexOfLastTrade - itemsPerPage;
  const currentTrades = allTrades.slice(indexOfFirstTrade, indexOfLastTrade);

  // Calculate success rate
  const totalWins = allTrades.filter(trade => trade.result === "win").length;
  const successRate = Math.round((totalWins / allTrades.length) * 100);

  return (
    <motion.div 
      className={`glass-panel p-4 rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Past Trades</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm px-2 py-0.5 rounded-full bg-primary/20 text-primary-foreground">
            Success Rate: {successRate}%
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {currentTrades.map((trade) => (
          <Card key={trade.id} className="overflow-hidden border-0 bg-card/50 hover:bg-card/80 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-base mb-1">{trade.market}</h3>
                  <p className="text-sm text-muted-foreground">{trade.position}</p>
                </div>
                <div className={`flex items-center justify-center h-6 w-6 rounded-full ${
                  trade.result === "win" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  {trade.result === "win" ? 
                    <Check size={14} className="text-green-400" /> : 
                    <X size={14} className="text-red-400" />}
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/30">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  {trade.date}
                </div>
                <div className={`font-medium ${
                  trade.profitLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}>
                  {trade.profitLoss >= 0 ? "+" : ""}${Math.abs(trade.profitLoss).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className="cursor-pointer"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default PastTrades;

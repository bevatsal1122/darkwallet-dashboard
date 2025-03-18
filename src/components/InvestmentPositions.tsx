
import React from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      market: "Will Trump win the 2024 election?",
      position: "YES",
      allocation: 25,
      currentValue: 3245.68,
      changePercent: 12.4,
      expirationDate: "Nov 5, 2024"
    },
    {
      id: "pos-2",
      market: "Will Bitcoin reach $100K in 2024?",
      position: "YES",
      allocation: 20,
      currentValue: 2567.15,
      changePercent: 8.7,
      expirationDate: "Dec 31, 2024"
    },
    {
      id: "pos-3",
      market: "Will the Lakers win the NBA championship?",
      position: "NO",
      allocation: 15,
      currentValue: 1842.30,
      changePercent: -4.2,
      expirationDate: "Jun 20, 2024"
    },
    {
      id: "pos-4",
      market: "Will GPT-5 be released this year?",
      position: "YES",
      allocation: 10,
      currentValue: 1256.45,
      changePercent: 15.8,
      expirationDate: "Dec 31, 2024"
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
        <span className="text-sm text-muted-foreground">Managed by AI Agent</span>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Market</TableHead>
              <TableHead className="text-right">Position</TableHead>
              <TableHead className="text-right">Allocation</TableHead>
              <TableHead className="text-right">Current Value</TableHead>
              <TableHead className="text-right">Performance</TableHead>
              <TableHead className="text-right">Expiration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell className="font-medium">{position.market}</TableCell>
                <TableCell className="text-right">{position.position}</TableCell>
                <TableCell className="text-right">{position.allocation}%</TableCell>
                <TableCell className="text-right">${position.currentValue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className={`flex items-center justify-end gap-1 ${position.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {position.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {Math.abs(position.changePercent)}%
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 text-muted-foreground">
                    <Calendar size={14} />
                    {position.expirationDate}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default InvestmentPositions;


// InvestmentPositions.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SparklesIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from "@/lib/utils";

// Define a type for the investment position
interface InvestmentPosition {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  percentage: number;
  profit: number;
  profitPercentage: number;
}

// Mock function to simulate fetching investment positions
const fetchInvestmentPositions = async (): Promise<InvestmentPosition[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: InvestmentPosition[] = [
        {
          id: "1",
          name: "Bitcoin",
          symbol: "BTC",
          amount: 0.05,
          price: 65000,
          percentage: 40,
          profit: 500,
          profitPercentage: 0.8,
        },
        {
          id: "2",
          name: "Ethereum",
          symbol: "ETH",
          amount: 1.5,
          price: 3500,
          percentage: 30,
          profit: 300,
          profitPercentage: 0.6,
        },
        {
          id: "3",
          name: "Solana",
          symbol: "SOL",
          amount: 20,
          price: 150,
          percentage: 15,
          profit: 150,
          profitPercentage: 0.5,
        },
        {
          id: "4",
          name: "Cardano",
          symbol: "ADA",
          amount: 500,
          price: 0.5,
          percentage: 10,
          profit: 50,
          profitPercentage: 0.1,
        },
        {
          id: "5",
          name: "Ripple",
          symbol: "XRP",
          amount: 1000,
          price: 0.6,
          percentage: 5,
          profit: 20,
          profitPercentage: 0.03,
        },
      ];
      resolve(mockData);
    }, 500);
  });
};

interface InvestmentPositionsProps {
  className?: string;
}

const InvestmentPositions: React.FC<InvestmentPositionsProps> = ({ className }) => {
  // Use react-query to fetch investment positions - updated to use object syntax
  const { data: investmentPositions, isLoading, isError } = useQuery({
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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Investment Positions</h2>
          <p className="text-muted-foreground text-sm">
            Overview of your current investment portfolio.
          </p>
        </div>

        <Table>
          <TableCaption>A comprehensive overview of your investment positions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">Profit %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investmentPositions?.map((position, index) => (
              <TableRow key={position.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{position.name}</TableCell>
                <TableCell>{position.symbol}</TableCell>
                <TableCell>{position.amount}</TableCell>
                <TableCell>${position.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{position.percentage}%</TableCell>
                <TableCell className="text-right">${position.profit.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  {position.profitPercentage > 0 ? (
                    <Badge variant="outline" className="gap-1.5">
                      <ArrowUp className="h-4 w-4" />
                      {position.profitPercentage.toFixed(2)}%
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1.5">
                      <ArrowDown className="h-4 w-4" />
                      {position.profitPercentage.toFixed(2)}%
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Portfolio Allocation</h3>
          <ul className="space-y-4">
            {investmentPositions?.map((position) => (
              <li key={position.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <SparklesIcon className="mr-2 h-5 w-5 text-accent" />
                  <span>{position.name} ({position.percentage}%)</span>
                </div>
                <div className="w-32">
                  <Progress value={position.percentage} className="h-2 [&>div]:bg-[#10B981]" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentPositions;

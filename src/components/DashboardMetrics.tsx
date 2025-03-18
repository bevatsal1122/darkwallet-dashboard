
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, LineChart } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: React.ReactNode;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, delay = 0 }) => {
  return (
    <motion.div
      className="glass-panel p-5 rounded-xl shadow-soft card-hover flex flex-col"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-white/5">
          {icon}
        </div>
      </div>
      <div className="mt-1">
        <h2 className="text-2xl font-bold">{value}</h2>
        {change && (
          <div className={`flex items-center mt-1 text-sm ${change.positive ? 'text-green-400' : 'text-red-400'}`}>
            {change.positive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            <span>{change.value}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <MetricCard
        title="Total Invested"
        value="$12,456.78"
        icon={<DollarSign size={20} className="text-primary" />}
        delay={0}
      />
      <MetricCard
        title="Current Value"
        value="$14,892.32"
        change={{ value: "+12.4%", positive: true }}
        icon={<LineChart size={20} className="text-accent" />}
        delay={1}
      />
      <MetricCard
        title="Total Profit"
        value="$2,435.54"
        change={{ value: "+19.8%", positive: true }}
        icon={<TrendingUp size={20} className="text-green-400" />}
        delay={2}
      />
    </div>
  );
};

export default DashboardMetrics;

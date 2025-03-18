
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardMetrics from "@/components/DashboardMetrics";
import PerformanceChart from "@/components/PerformanceChart";
import AssetAllocationChart from "@/components/AssetAllocationChart";
import InvestmentPositions from "@/components/InvestmentPositions";
import PastTrades from "@/components/PastTrades";
import UpcomingEvents from "@/components/UpcomingEvents";
import PageTransition from "@/components/layout/PageTransition";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">AI-powered NBA Sports Polymarket Portfolio</p>
        
        <DashboardMetrics />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PerformanceChart />
          <AssetAllocationChart />
        </div>
        
        <InvestmentPositions className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <UpcomingEvents />
          <PastTrades />
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;

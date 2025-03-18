
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardMetrics from "@/components/DashboardMetrics";
import PerformanceChart from "@/components/PerformanceChart";
import AssetAllocationChart from "@/components/AssetAllocationChart";
import InvestmentPositions from "@/components/InvestmentPositions";
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
        <p className="text-muted-foreground mb-8">AI-powered Polymarket investment portfolio</p>
        
        <DashboardMetrics />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PerformanceChart />
          <AssetAllocationChart />
        </div>
        
        <InvestmentPositions className="mb-8" />
      </div>
    </PageTransition>
  );
};

export default Dashboard;

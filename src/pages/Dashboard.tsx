
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardMetrics from "@/components/DashboardMetrics";
import PerformanceChart from "@/components/PerformanceChart";
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
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <DashboardMetrics />
        
        <PerformanceChart />
      </div>
    </PageTransition>
  );
};

export default Dashboard;

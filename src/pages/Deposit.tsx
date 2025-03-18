
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletConnect from "@/components/WalletConnect";
import PageTransition from "@/components/layout/PageTransition";

const Deposit: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("evm");

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
        <h1 className="text-3xl font-bold mb-8">Deposit</h1>
        
        <div className="max-w-3xl mx-auto">
          <Tabs 
            defaultValue="evm" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="evm">EVM</TabsTrigger>
              <TabsTrigger value="solana">Solana</TabsTrigger>
            </TabsList>
            
            <TabsContent value="evm" className="mt-0">
              <WalletConnect networkType="EVM" />
            </TabsContent>
            
            <TabsContent value="solana" className="mt-0">
              <WalletConnect networkType="Solana" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default Deposit;

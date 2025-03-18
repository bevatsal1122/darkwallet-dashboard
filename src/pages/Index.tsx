
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";

const Index: React.FC = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="fixed inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,56,90,0.1)_0,rgba(0,0,0,0)_60%)]" />
        </div>
        
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent to-primary mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-4">
                DarkWallet
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Secure, private, and seamless digital asset management for the modern investor
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              {isAuthenticated ? (
                <Button asChild size="lg" className="shadow-md">
                  <Link to="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" variant="outline" className="shadow-md backdrop-blur-md">
                    <Link to="/login">
                      Login
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="shadow-md">
                    <Link to="/login">
                      Create Account
                    </Link>
                  </Button>
                </>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <FeatureCard 
                title="Secure Storage" 
                description="Bank-grade encryption and security protocols to keep your assets safe."
                delay={0.1}
              />
              <FeatureCard 
                title="Private Transactions" 
                description="Enhanced privacy for all your financial activities."
                delay={0.2}
              />
              <FeatureCard 
                title="Portfolio Analytics" 
                description="Advanced tools to track and optimize your investments."
                delay={0.3}
              />
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

const FeatureCard: React.FC<{ title: string; description: string; delay: number }> = ({ 
  title, 
  description,
  delay
}) => {
  return (
    <motion.div 
      className="glass-panel rounded-xl p-6 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + delay }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

export default Index;

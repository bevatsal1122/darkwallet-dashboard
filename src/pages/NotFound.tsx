
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse" />
            <div className="absolute inset-3 bg-card rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">404</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild className="shadow-md">
            <Link to="/">Return to Home</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

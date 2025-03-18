
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePrivyAuth } from "@/hooks/usePrivyAuth";
import { Loader2 } from "lucide-react";

const AuthForm: React.FC = () => {
  const { login, isAuthenticated, ready } = usePrivyAuth();

  // If still loading Privy state or already authenticated, show loading state
  if (!ready || isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-xl shadow-lg overflow-hidden w-full max-w-md p-8 flex flex-col items-center justify-center"
      >
        <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
        <p className="text-muted-foreground">
          {!ready ? "Loading..." : "Already authenticated. Redirecting..."}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-xl shadow-lg overflow-hidden w-full max-w-md"
    >
      <div className="p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome to DarkWallet</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to access your dashboard and wallet
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full mt-6" 
            onClick={login}
          >
            Connect with Privy
          </Button>

          <p className="text-sm text-center text-muted-foreground mt-4">
            By connecting, a secure wallet will be automatically created for you
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;

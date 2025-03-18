
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="fixed inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,56,90,0.1)_0,rgba(0,0,0,0)_60%)]" />
        </div>

        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gradient">DarkWallet</h1>
            <p className="text-muted-foreground mt-2">Secure. Private. Yours.</p>
          </motion.div>

          <AuthForm />
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;

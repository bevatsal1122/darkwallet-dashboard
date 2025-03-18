
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";

type AuthMode = "login" | "signup";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes - mock authentication
      if (mode === "login") {
        localStorage.setItem("isAuthenticated", "true");
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        setMode("login");
        return;
      }
      
      // Redirect to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <h1 className="text-2xl font-bold mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "login" 
              ? "Sign in to access your dashboard" 
              : "Sign up to start your investment journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <User size={16} />
                </div>
                <Input
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="glass-input pl-9"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Mail size={16} />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Lock size={16} />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="glass-input pl-9"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "login" && (
            <div className="text-right">
              <button 
                type="button" 
                className="text-sm text-accent hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </div>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-accent hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";

// Imported components
import FormField from "./FormField";
import FormToggle from "./FormToggle";
import SubmitButton from "./SubmitButton";
import AuthHeader from "./AuthHeader";

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-xl shadow-lg overflow-hidden w-full max-w-md"
    >
      <div className="p-6 sm:p-8">
        <AuthHeader mode={mode} />

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <FormField
              id="username"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              required={true}
              icon={<User size={16} />}
            />
          )}

          <FormField
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required={true}
            icon={<Mail size={16} />}
          />

          <FormField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required={true}
            icon={<Lock size={16} />}
            endIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            onEndIconClick={togglePasswordVisibility}
          />

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

          <SubmitButton isLoading={isLoading} mode={mode} />
        </form>

        <FormToggle mode={mode} toggleMode={toggleMode} />
      </div>
    </motion.div>
  );
};

export default AuthForm;

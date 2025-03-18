
import React from "react";

interface AuthHeaderProps {
  mode: "login" | "signup";
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ mode }) => {
  return (
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
  );
};

export default AuthHeader;

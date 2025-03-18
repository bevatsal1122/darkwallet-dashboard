
import React from "react";

interface FormToggleProps {
  mode: "login" | "signup";
  toggleMode: () => void;
}

const FormToggle: React.FC<FormToggleProps> = ({ mode, toggleMode }) => {
  return (
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
  );
};

export default FormToggle;


import React, { useState } from "react";
import { motion } from "framer-motion";

interface TimeframeOption {
  id: string;
  label: string;
}

interface TimeframeSelectorProps {
  options: TimeframeOption[];
  onChange: (selectedId: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ options, onChange }) => {
  const [selectedId, setSelectedId] = useState(options[0].id);

  const handleSelection = (id: string) => {
    setSelectedId(id);
    onChange(id);
  };

  return (
    <div className="flex justify-center bg-secondary/40 p-1 rounded-lg backdrop-blur-sm">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleSelection(option.id)}
          className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-all z-10 ${
            selectedId === option.id ? "" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {selectedId === option.id && (
            <motion.div
              layoutId="timeframe-pill"
              className="absolute inset-0 bg-white/5 rounded-md shadow-sm z-0"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;

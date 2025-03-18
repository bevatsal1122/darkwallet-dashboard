
import React from "react";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconClick?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon,
  endIcon,
  onEndIconClick,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-muted-foreground">
          {icon}
        </div>
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="glass-input pl-9"
        />
        {endIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {endIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;

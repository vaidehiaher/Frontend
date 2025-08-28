import React from "react";

interface InputFieldProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: React.HTMLInputTypeAttribute;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300",
  outlined: "border border-gray-500",
  ghost: "border-none bg-transparent",
};

export const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
}) => {
  // Generate a stable id if one isn’t provided
  const autoId = React.useId();
  const inputId = id ?? `input-${autoId}`;
  const helperId = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  // Describe the input with helper/error text for screen readers
  const describedBy =
    (invalid && errorMessage ? errorId : "") +
    (!invalid && helperText ? helperId : "");

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={inputId} className="font-medium">
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${sizeClasses[size]} ${
          variantClasses[variant]
        } ${invalid ? "border-red-500" : ""} ${disabled ? "opacity-60" : ""}`}
      />

      {/* Live helper/error messages with ids so SRs can announce them */}
      {invalid && errorMessage ? (
        <span id={errorId} role="alert" className="text-red-600 text-sm">
          {errorMessage}
        </span>
      ) : (
        helperText && (
          <span id={helperId} className="text-gray-500 text-sm">
            {helperText}
          </span>
        )
      )}
    </div>
  );
};

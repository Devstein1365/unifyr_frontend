import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  error,
  icon,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-white/90">
          {label} {required && <span className="text-[#FFD60A]">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full ${
            icon ? "pl-12" : "pl-4"
          } pr-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all ${
            error ? "border-red-400" : "border-white/20"
          }`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};

export default Input;

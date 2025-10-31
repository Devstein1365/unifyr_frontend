import React from "react";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  required = false,
  className = "",
  placeholder = "Select an option",
  error,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-white/90">
          {label} {required && <span className="text-[#FFD60A]">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all cursor-pointer ${
          error ? "border-red-400" : "border-white/20"
        }`}
        {...props}
      >
        <option value="" disabled className="bg-[#0A192F]">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="bg-[#0A192F] text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};

export default Select;

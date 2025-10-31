import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-[#FFD60A] text-[#0A192F] hover:bg-[#ffd000] shadow-lg hover:shadow-xl",
    secondary:
      "border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
    outline: "border-2 border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A]/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

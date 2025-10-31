import React from "react";

const Card = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-white/5 backdrop-blur-md border border-white/10",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20",
    solid: "bg-[#0A192F] border border-[#FFD60A]/30",
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-xl ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

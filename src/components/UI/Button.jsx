import React from "react";

const Button = ({ onClick, children, type = "button", className = "", ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-8 py-3 text-base bg-primary text-white border-none rounded-lg cursor-pointer transition-colors hover:bg-primary-hover ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;

import React from "react";

const Button = ({ onClick, children, type = "button", className = "", ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={className}
    style={{
      padding: "12px 32px",
      fontSize: "16px",
      backgroundColor: "#0078d4",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      ...props.style
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button;
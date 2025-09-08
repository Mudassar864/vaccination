import React from "react";

const Button = ({ onClick, children, type = "button", className = "", ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={className}
    style={{
     
      ...props.style
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button;
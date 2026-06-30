import React from "react";

export default function Button({ children, type = "button", variant = "primary", onClick, className = "", ...props }) {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900",
    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

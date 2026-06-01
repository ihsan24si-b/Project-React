import React from 'react';

export default function Navbar({ children, className = '' }) {
  return <nav className={`flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 ${className}`}>{children}</nav>;
}

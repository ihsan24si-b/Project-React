import React from 'react';

export default function Tag({ children, className = '' }) {
  return <span className={`rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 ${className}`}>{children}</span>;
}

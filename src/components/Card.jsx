import React from 'react';

export default function Card({ title, children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}

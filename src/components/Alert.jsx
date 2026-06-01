import React from 'react';

export default function Alert({ children, type = 'info', className = '' }) {
  const styles = {
    info: 'bg-sky-50 border-sky-200 text-sky-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    danger: 'bg-rose-50 border-rose-200 text-rose-800',
  };

  return (
    <div className={`rounded-3xl border p-4 text-sm ${styles[type] || styles.info} ${className}`}>
      {children}
    </div>
  );
}

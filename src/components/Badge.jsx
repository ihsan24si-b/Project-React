import React from 'react';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const styles = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${styles[variant] || styles.primary} ${className}`}>
      {children}
    </span>
  );
}

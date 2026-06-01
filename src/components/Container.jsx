import React from 'react';

export default function Container({ children, className = '' }) {
  return <div className={`container mx-auto px-4 py-4 ${className}`}>{children}</div>;
}

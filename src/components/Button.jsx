import React from 'react';

export default function Button({ children, type = 'primary', onClick, className = '' }) {
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition ${styles[type] || styles.primary} ${className}`}
    >
      {children}
    </button>
  );
}

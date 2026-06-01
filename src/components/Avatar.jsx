import React from 'react';

export default function Avatar({ name = '', src, className = '' }) {
  const initials = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className={`w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden ${className}`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-lg font-bold text-slate-700">{initials}</span>
      )}
    </div>
  );
}

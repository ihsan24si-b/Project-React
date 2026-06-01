import React from 'react';

export default function Footer({ children, className = '' }) {
  return (
    <footer className={`rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-600 ${className}`}>
      {children || '© 2026 GearShift Workshop. All rights reserved.'}
    </footer>
  );
}

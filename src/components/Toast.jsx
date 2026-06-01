import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 rounded-3xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
      {message}
    </div>
  );
}

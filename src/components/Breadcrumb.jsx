import React from 'react';

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="text-sm text-slate-500">
      {items.map((item, index) => (
        <span key={index}>
          {item}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </div>
  );
}

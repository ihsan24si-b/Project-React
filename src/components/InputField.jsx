import React from 'react';

export default function InputField({ label, value, onChange, placeholder = '', type = 'text' }) {
  return (
    <label className="block text-sm text-slate-700">
      {label && <span className="block mb-2 font-medium">{label}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

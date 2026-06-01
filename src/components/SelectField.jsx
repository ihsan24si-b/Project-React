import React from 'react';

export default function SelectField({ label, options = [], value, onChange }) {
  return (
    <label className="block text-sm text-slate-700">
      {label && <span className="block mb-2 font-medium">{label}</span>}
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option.value || option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

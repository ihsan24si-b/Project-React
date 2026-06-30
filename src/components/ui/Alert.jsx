import React from "react";

export default function Alert({ title, description, onClose, variant = "success" }) {
  const styles = {
    success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
    info: "border border-blue-200 bg-blue-50 text-blue-700",
    error: "border border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className={`rounded-3xl p-4 ${styles[variant]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          {title ? <p className="font-semibold">{title}</p> : null}
          <p className="text-sm leading-6">{description}</p>
        </div>
        {onClose ? (
          <button type="button" className="text-slate-500 hover:text-slate-800" onClick={onClose}>
            Tutup
          </button>
        ) : null}
      </div>
    </div>
  );
}

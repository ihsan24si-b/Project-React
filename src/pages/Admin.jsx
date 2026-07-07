import React from "react";
import { FaCog } from "react-icons/fa";

export default function Admin() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3 text-lg font-semibold tracking-wide">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <FaCog />
            </span>
            <span>GearShift Admin</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-4 text-slate-600">Ini adalah halaman admin. Tambahkan fungsionalitas manajemen di sini.</p>
      </main>
    </div>
  );
}

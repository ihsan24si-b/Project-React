import { useState } from "react";
import PageHeader from "../components/PageHeader";
// Mengimpor data json. Jika kamu sudah punya data berbeda, pastikan path-nya benar
import serviceData from "../data/Orders.json"; 

export default function ServiceQueue() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeader title="Service Queue" breadcrumb="Active Services">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
        >
          + Register Vehicle
        </button>
      </PageHeader>

      {/* MODAL POP UP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-black mb-6 text-slate-800">Register Vehicle</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Service ID</label>
                <input type="text" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-600" placeholder="#SVC-XXX" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                <select className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none focus:border-blue-600">
                  <option>Waiting in Line</option>
                  <option>In Progress</option>
                  <option>Ready for Pickup</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-blue-600/30">Add to Queue</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DATA TABLE */}
      <div className="mt-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-sm font-bold text-slate-600 uppercase">Service ID</th>
              <th className="p-4 text-sm font-bold text-slate-600 uppercase">Customer / Mechanic</th>
              <th className="p-4 text-sm font-bold text-slate-600 uppercase">Total Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {serviceData.map((service) => (
              <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-blue-600">{service.id}</td>
                <td className="p-4 text-slate-700 font-medium">{service.name}</td>
                <td className="p-4 font-bold text-slate-800">{service.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
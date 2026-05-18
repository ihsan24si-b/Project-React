import { Link } from "react-router-dom";
import { spareparts } from "../data/spareparts";

export default function Spareparts() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Sparepart Inventory</h1>
                <button className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-900 transition-all">
                    Export Data
                </button>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
                <table className="min-w-full table-auto">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Part ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Item Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Level</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Unit Price</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {spareparts.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-bold text-slate-600">{item.id}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-800">{item.name}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.qty < item.minQty ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {item.qty} pcs
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.price}</td>
                                <td className="px-6 py-4 text-sm">
                                    <Link to={`/spareparts/${item.id}`} className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-white text-xs font-semibold hover:bg-slate-800 transition-all">
                                        Lihat Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
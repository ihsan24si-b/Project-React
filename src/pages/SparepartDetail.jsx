import { Link, useParams } from "react-router-dom";
import { spareparts } from "../data/spareparts";

export default function SparepartDetail() {
    const { id } = useParams();
    const part = spareparts.find((item) => item.id === id);

    if (!part) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Detail Sparepart</h1>
                    <Link to="/spareparts" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                        Kembali ke daftar
                    </Link>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <p className="text-slate-700">Sparepart dengan ID <strong>{id}</strong> tidak ditemukan.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Detail Sparepart</h1>
                    <p className="text-sm text-slate-500">Informasi lengkap untuk {part.name}</p>
                </div>
                <Link to="/spareparts" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">
                    Kembali ke daftar
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <img
                        src={part.image}
                        alt={part.name}
                        className="h-72 w-full object-cover"
                    />
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-800">Rincian Produk</h2>
                            <p className="mt-2 text-sm text-slate-500">Detail teknis dan informasi stok.</p>
                        </div>
                        <div className="grid gap-4">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs uppercase tracking-wide text-slate-500">Part ID</div>
                                <div className="mt-1 text-lg font-semibold text-slate-800">{part.id}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs uppercase tracking-wide text-slate-500">Nama Sparepart</div>
                                <div className="mt-1 text-lg font-semibold text-slate-800">{part.name}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs uppercase tracking-wide text-slate-500">Kategori</div>
                                <div className="mt-1 text-lg font-semibold text-slate-800">{part.category}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs uppercase tracking-wide text-slate-500">Lokasi</div>
                                <div className="mt-1 text-lg font-semibold text-slate-800">{part.location}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs uppercase tracking-wide text-slate-500">Supplier</div>
                                <div className="mt-1 text-lg font-semibold text-slate-800">{part.supplier}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h3 className="text-lg font-bold text-slate-800">Status Stok</h3>
                        <div className="mt-5 space-y-3">
                            <div className="flex items-center justify-between text-sm text-slate-600">
                                <span>Jumlah tersedia</span>
                                <span className="font-semibold text-slate-800">{part.qty} pcs</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600">
                                <span>Harga satuan</span>
                                <span className="font-semibold text-slate-800">{part.price}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600">
                                <span>Status</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${part.qty < part.minQty ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {part.qty < part.minQty ? 'Reorder Needed' : part.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h3 className="text-lg font-bold text-slate-800">Deskripsi</h3>
                        <p className="mt-4 text-sm leading-7 text-slate-600">{part.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

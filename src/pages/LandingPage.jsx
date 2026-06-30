import React, { useState, useEffect } from "react";
import { FaArrowRight, FaBolt, FaChartLine, FaClock, FaCog, FaTools, FaWhatsapp, FaSearch, FaChevronRight } from "react-icons/fa";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Dialog from "../components/ui/Dialog";
import Form from "../components/ui/Form";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

const features = [
  {
    title: "Kelola antrian servis",
    text: "Pantau kendaraan masuk, estimasi selesai, dan prioritas pekerjaan dari satu tampilan yang rapi.",
    icon: FaClock,
  },
  {
    title: "Pantau stok sparepart",
    text: "Jaga ketersediaan suku cadang penting agar servis tidak tertunda.",
    icon: FaTools,
  },
  {
    title: "Hubungkan dengan pelanggan",
    text: "Kirim reminder servis dan follow-up secara otomatis lewat WhatsApp.",
    icon: FaWhatsapp,
  },
  {
    title: "Lihat kinerja bengkel",
    text: "Dapatkan insight penjualan, performa teknisi, dan layanan secara cepat.",
    icon: FaChartLine,
  },
];

const steps = [
  "Daftarkan pelanggan dan kendaraan",
  "Atur servis, jadwal, dan teknisi",
  "Pantau hasil dan tingkatkan loyalitas pelanggan",
];

const defaultServices = [
  {
    id: 1,
    title: "Ganti Oli Mesin",
    category: "Perawatan",
    description: "Servis ganti oli lengkap untuk menjaga performa dan umur mesin.",
    details: "Ganti oli mesin, saringan oli baru, pemeriksaan kebocoran, dan pembersihan komponen ringan.",
    duration: "60 menit",
    parts: "Oli mesin, filter oli",
    stok: 5,
    jumlah_klik: 0,
  },
  {
    id: 2,
    title: "Tune Up Ringan",
    category: "Perawatan",
    description: "Tune up untuk meningkatkan efisiensi bahan bakar dan respons mesin.",
    details: "Pembersihan busi, pembersihan karburator/injeksi, dan pengaturan kembali sistem pengapian.",
    duration: "90 menit",
    parts: "Busi, pembersihan sistem bahan bakar",
    stok: 3,
    jumlah_klik: 0,
  },
  {
    id: 3,
    title: "Perbaikan Rem",
    category: "Perbaikan",
    description: "Servis lengkap sistem rem untuk keselamatan berkendara.",
    details: "Penggantian kampas rem, penggantian minyak rem, dan pemeriksaan kaliper serta selang rem.",
    duration: "120 menit",
    parts: "Kampas rem, minyak rem",
    stok: 0,
    jumlah_klik: 0,
  },
  {
    id: 4,
    title: "Modifikasi Suspensi",
    category: "Modifikasi",
    description: "Upgrade suspensi untuk kenyamanan dan handling yang lebih baik.",
    details: "Penggantian per pegas, peredam kejut, dan penyetelan ulang sudut ban jika diperlukan.",
    duration: "150 menit",
    parts: "Per pegas, shock absorber",
    stok: 2,
    jumlah_klik: 0,
  },
  {
    id: 5,
    title: "Servis AC Mobil",
    category: "Perbaikan",
    description: "Pemeriksaan dan pengisian ulang sistem pendingin AC mobil.",
    details: "Pembersihan evaporator, pengecekan kompresor, dan refill freon sesuai standar pabrik.",
    duration: "90 menit",
    parts: "Freon, pembersihan AC",
    stok: 4,
    jumlah_klik: 0,
  },
];

export default function LandingPage() {
  const [services, setServices] = useState(defaultServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Semua");
  const [filteredServices, setFilteredServices] = useState(defaultServices);
  const [topServices, setTopServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [members, setMembers] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem("gearshift_members");
    return stored ? JSON.parse(stored) : [];
  });
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberWhatsapp, setMemberWhatsapp] = useState("");
  const [memberVehicle, setMemberVehicle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filtered = services.filter((service) => {
      const matchesCategory = category === "Semua" || service.category === category;
      const matchesSearch =
        service.title.toLowerCase().includes(normalizedSearch) ||
        service.category.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
    setFilteredServices(filtered);
  }, [searchTerm, category, services]);

  useEffect(() => {
    const sorted = [...services]
      .sort((a, b) => b.jumlah_klik - a.jumlah_klik)
      .slice(0, 3);
    setTopServices(sorted);
  }, [services]);

  useEffect(() => {
    window.localStorage.setItem("gearshift_members", JSON.stringify(members));
  }, [members]);

  function handleMemberSubmit(event) {
    event.preventDefault();
    const name = memberName.trim();
    if (!name || !memberEmail.trim() || !memberWhatsapp.trim() || !memberVehicle.trim()) {
      setSuccessMessage("Silakan lengkapi semua data untuk mendaftar member.");
      return;
    }

    const newMember = {
      id: Date.now(),
      name,
      email: memberEmail.trim(),
      whatsapp: memberWhatsapp.trim(),
      vehicle: memberVehicle.trim(),
      joinedAt: new Date().toISOString(),
    };
    setMembers((current) => [newMember, ...current]);
    setSuccessMessage(`Terima kasih ${name}, pendaftaran member GearShift Rewards berhasil! Kode voucher diskon telah dikirim ke WhatsApp Anda.`);
    setMemberName("");
    setMemberEmail("");
    setMemberWhatsapp("");
    setMemberVehicle("");
  }

  function handleCloseAlert() {
    setSuccessMessage("");
  }

  function handleOpenDetail(service) {
    const updatedService = { ...service, jumlah_klik: service.jumlah_klik + 1 };
    setServices((current) =>
      current.map((item) => (item.id === service.id ? updatedService : item))
    );
    setActiveService(updatedService);
    setIsDialogOpen(true);
  }

  function handleCloseDetail() {
    setIsDialogOpen(false);
    setActiveService(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3 text-lg font-semibold tracking-wide">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <FaCog />
            </span>
            <span>GearShift CRM</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#fitur" className="transition hover:text-slate-900">
              Fitur
            </a>
            <a href="#langkah" className="transition hover:text-slate-900">
              Langkah
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Masuk
            </a>
            <a href="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              Daftar
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-700">
              <FaBolt />
              CRM untuk tamu dan pelanggan bengkel
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Solusi CRM sederhana untuk bengkel yang ingin tumbuh.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600">
                GearShift membantu bengkel mengatur servis, stok sparepart, dan komunikasi pelanggan dari satu platform yang mudah dipakai.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                Mulai sekarang <FaArrowRight />
              </a>
              <a href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                Sudah punya akun
              </a>
            </div>
            <div className="flex flex-wrap gap-4 pt-3 text-sm text-slate-600">
              <span className="rounded-full bg-white px-3 py-2 shadow-sm">24/7 pantauan servis</span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm">+1.200 transaksi terkelola</span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm">98% kepuasan pelanggan</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="rounded-4xl border border-blue-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Ringkasan Hari Ini</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">42 servis aktif</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-400">
                  <FaChartLine className="text-xl" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { label: "Antrian siap", value: "12 kendaraan" },
                  { label: "Sparepart menipis", value: "3 item" },
                  { label: "Follow-up pelanggan", value: "8 orang" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="fitur" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Kenapa GearShift</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Semua yang dibutuhkan bengkel modern dalam satu tempat.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-600">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="layanan" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Layanan bengkel</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Pilih layanan yang paling sesuai untuk kendaraan Anda.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700">
              <FaSearch /> Interaktif & dilengkapi analitik klik
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-[1.8fr_1fr]">
                <Input
                  label="Cari layanan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Misal: Ganti Oli, Rem, Tune Up"
                />
                <Select
                  label="Filter kategori"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={[
                    { label: "Semua", value: "Semua" },
                    { label: "Perawatan", value: "Perawatan" },
                    { label: "Perbaikan", value: "Perbaikan" },
                    { label: "Modifikasi", value: "Modifikasi" },
                  ]}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredServices.map((service) => (
                  <div key={service.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{service.category}</p>
                        <h3 className="mt-3 text-xl font-semibold text-slate-900">{service.title}</h3>
                      </div>
                      <div className="rounded-2xl bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {service.stok > 0 ? `${service.stok} slot` : "Slot Penuh"}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
                      <span className="rounded-full bg-slate-100 px-3 py-2">{service.duration}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-2">{service.parts}</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        onClick={() => handleOpenDetail(service)}
                      >
                        Lihat Detail
                        <FaChevronRight />
                      </button>
                      <button
                        type="button"
                        disabled={service.stok === 0}
                        className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                          service.stok === 0
                            ? "cursor-not-allowed bg-slate-200 text-slate-500"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        {service.stok === 0 ? "Tidak tersedia" : "Booking Sekarang"}
                      </button>
                    </div>
                    {service.stok === 0 ? (
                      <div className="mt-4 rounded-2xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
                        Slot Penuh - cek layanan lain atau balik lagi besok.
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">3 Layanan Terpopuler</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">Sering dicari minggu ini</h3>
              <div className="mt-6 space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{service.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{service.category}</p>
                      </div>
                      <div className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                        {service.jumlah_klik} klik
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                  </div>
                ))}
                {topServices.length === 0 ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
                    Klik tombol Lihat Detail untuk mulai mengumpulkan data layanan populer.
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </section>

        <section id="crm" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-4xl border border-blue-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Gabung GearShift Elite Rewards</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                  Dapatkan voucher diskon 20% untuk servis pertama Anda.
                </h2>
                <p className="mt-4 max-w-2xl text-slate-600">
                  Daftar member untuk menyimpan histori servis, dapatkan prioritas antrean, dan raih keuntungan loyalitas eksklusif GearShift.
                </p>
              </div>
              <div className="rounded-4xl bg-blue-600 p-4 text-white shadow-lg lg:w-90">
                <p className="text-sm uppercase tracking-[0.24em] text-blue-200">Member terdaftar</p>
                <p className="mt-3 text-5xl font-bold">{members.length}</p>
                <p className="mt-2 text-sm text-blue-100">Pendaftar baru siap menikmati promo dan layanan VIP.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_0.75fr]">
              <div className="space-y-5">
                {successMessage ? (
                  <Alert title="Pendaftaran berhasil" description={successMessage} onClose={handleCloseAlert} variant="success" />
                ) : null}

                <Form onSubmit={handleMemberSubmit} className="rounded-4xl border border-slate-200 bg-slate-50 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Input
                        label="Nama Lengkap"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <Input
                        label="Alamat Email"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        placeholder="email@contoh.com"
                      />
                    </div>
                    <div>
                      <Input
                        label="Nomor WhatsApp"
                        value={memberWhatsapp}
                        onChange={(e) => setMemberWhatsapp(e.target.value)}
                        placeholder="0812xxxxxxx"
                      />
                    </div>
                    <div>
                      <Input
                        label="Merek / Tipe Kendaraan"
                        value={memberVehicle}
                        onChange={(e) => setMemberVehicle(e.target.value)}
                        placeholder="Toyota Avanza / Honda Beat"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit">Daftar Member</Button>
                    <p className="text-sm text-slate-600">Data tersimpan lokal untuk simulasi CRM.</p>
                  </div>
                </Form>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Bronze",
                    tier: "1–3 Kali Servis",
                    benefit: "Gratis General Check-up / Cek Fluida Kendaraan.",
                    badge: "Bronze",
                  },
                  {
                    title: "Silver",
                    tier: "4–10 Kali Servis",
                    benefit: "Diskon 10% Suku Cadang & Prioritas Antrean Fast Track.",
                    badge: "Silver",
                  },
                  {
                    title: "Gold",
                    tier: "11–20 Kali Servis",
                    benefit: "Gratis Jasa Cuci Kendaraan setiap Servis & Konsultasi Mekanik Senior.",
                    badge: "Gold",
                  },
                  {
                    title: "Platinum",
                    tier: ">20 Kali Servis",
                    benefit: "Layanan Antar-Jemput Kendaraan Gratis & Akses VIP Lounge.",
                    badge: "Platinum",
                  },
                ].map((tier) => (
                  <div key={tier.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
                        {tier.badge}
                      </div>
                      <p className="text-sm text-slate-500">{tier.tier}</p>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{tier.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{tier.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="langkah" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-4xl border border-slate-200 bg-linear-to-br from-blue-50 to-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Cara kerja</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Sederhana, cepat, dan siap tumbuh</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={isDialogOpen} title={activeService?.title ?? "Detail Layanan"} onClose={handleCloseDetail}>
          {activeService ? (
            <div className="space-y-4 text-slate-700">
              <p className="text-sm text-slate-500">Kategori: {activeService.category}</p>
              <p>{activeService.details}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Estimasi waktu</p>
                  <p className="mt-2 text-sm text-slate-600">{activeService.duration}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Suku cadang</p>
                  <p className="mt-2 text-sm text-slate-600">{activeService.parts}</p>
                </div>
              </div>
              <div className="rounded-3xl bg-blue-50 p-4 text-sm font-semibold text-blue-700">
                Sisa slot hari ini: {activeService.stok}
              </div>
            </div>
          ) : (
            <p className="text-slate-600">Memuat detail layanan...</p>
          )}
        </Dialog>

        <section id="cta" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="rounded-4xl border border-blue-200 bg-blue-50 p-8 text-center lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Siap mencoba?</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Buka GearShift dan kelola bengkel Anda lebih nyaman.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/register" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                Daftar sekarang
              </a>
              <a href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                Masuk ke akun
              </a>
            </div>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/?text=Halo%20GearShift%20Bengkel%2C%20saya%20pengunjung%20website%20dan%20ingin%20bertanya%20mengenai%20kendala%20kendaraan%20saya%20serta%20booking%20jadwal%20servis..."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-emerald-500 px-4 py-4 text-white shadow-2xl transition hover:bg-emerald-600"
      >
        <FaWhatsapp className="h-6 w-6" />
      </a>
      <footer className="border-t border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 GearShift CRM. Dibuat untuk bengkel modern.</p>
          <div className="flex gap-4">
            <a href="#fitur" className="transition hover:text-slate-900">
              Fitur
            </a>
            <a href="#langkah" className="transition hover:text-slate-900">
              Langkah
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

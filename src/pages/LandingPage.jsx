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
    heroTitle: "Ganti Oli Mesin (Paket Perawatan)",
    category: "Perawatan",
    cardDescription: "Servis ganti oli lengkap untuk menjaga performa dan umur mesin.",
    detailInfo: "🕒 Estimasi: 60 Menit | 👨‍🔧 Mekanik: Ahli Pelumasan | ⚡ 5 slot antrean tersedia hari ini",
    badges: ["Oli Original", "Termasuk Filter Oli"],
    detailedDescription:
      "Layanan penggantian oli mesin secara menyeluruh untuk menjaga keausan komponen internal, mendinginkan suhu mesin, dan memperpanjang umur pakai kendaraan Anda. Sangat direkomendasikan setiap pemakaian 5.000 - 10.000 KM.",
    leftBenefits: ["Pengurasan Oli Lama", "Penggantian Filter Oli Baru", "Pembersihan Sumbatan Oli"],
    rightBenefits: ["Pengecekan Level Dipstick", "Ruang Tunggu AC & Wi-Fi", "Free Drink"],
    duration: "60 menit",
    parts: "Oli mesin, filter oli",
    price: "Rp 350.000",
    priceSuffix: "/ servis",
    stok: 5,
    jumlah_klik: 0,
  },
  {
    id: 2,
    title: "Tune Up Ringan",
    heroTitle: "Tune Up Ringan (Paket Perawatan)",
    category: "Perawatan",
    cardDescription: "Tune up untuk meningkatkan efisiensi bahan bakar dan respons mesin.",
    detailInfo: "🕒 Estimasi: 90 Menit | 👨‍🔧 Mekanik: Engine Tuner | ⚡ 3 slot antrean tersedia hari ini",
    badges: ["Bahan Bakar Irit", "Respons Responsif"],
    detailedDescription:
      "Mengembalikan performa mesin yang mulai loyo. Fokus pada optimalisasi sistem pembakaran dan udara agar konsumsi bahan bakar kembali efisien dan tarikan gas menjadi lebih enteng serta responsif.",
    leftBenefits: ["Pembersihan Busi & Throttle Body", "Kalibrasi Sensor Mesin", "Pembersihan Jalur Bahan Bakar"],
    rightBenefits: ["Cek Filter Udara", "Ruang Tunggu AC & Wi-Fi", "Free Snack & Coffee"],
    duration: "90 menit",
    parts: "Busi, pembersihan sistem bahan bakar",
    price: "Rp 450.000",
    priceSuffix: "/ servis",
    stok: 3,
    jumlah_klik: 0,
  },
  {
    id: 3,
    title: "Perbaikan Rem",
    heroTitle: "Perbaikan & Servis Rem (Paket Perbaikan)",
    category: "Perbaikan",
    cardDescription: "Servis lengkap sistem rem untuk keselamatan berkendara.",
    detailInfo: "🕒 Estimasi: 60 Menit | 👨‍🔧 Mekanik: Brake Specialist | ⚡ 3 slot antrean tersedia hari ini",
    badges: ["Pengereman Pakem", "Safety Guaranteed"],
    detailedDescription:
      "Layanan vital untuk menjaga keselamatan berkendara Anda. Fokus pada perbaikan sistem pengereman yang kurang pakem, berbunyi derit, atau terasa bergetar saat diinjak. Komponen rem akan dibersihkan dan disetel ulang agar daya cengkeram kembali optimal.",
    leftBenefits: ["Penggantian Kampas Rem (Pad/Shoe)", "Pembersihan & Pelumasan Kaliper", "Bleeding / Kuras Minyak Rem"],
    rightBenefits: ["Cek Ketebalan Piringan Cakram", "Ruang Tunggu AC & Wi-Fi", "Free General Check-up 21 Titik"],
    duration: "60 menit",
    parts: "Kampas rem, minyak rem",
    price: "Rp 250.000",
    priceSuffix: "/ servis",
    stok: 3,
    jumlah_klik: 0,
  },
  {
    id: 4,
    title: "Modifikasi Suspensi",
    heroTitle: "Modifikasi & Upgrade Suspensi (Paket Modifikasi)",
    category: "Modifikasi",
    cardDescription: "Upgrade suspensi untuk kenyamanan dan handling yang lebih baik.",
    detailInfo: "🕒 Estimasi: 150 Menit | 👨‍🔧 Mekanik: Understeel Specialist | ⚡ 2 slot antrean tersedia hari ini",
    badges: ["Garansi Setting", "Handling Stabil"],
    detailedDescription:
      "Upgrade sistem peredam kejut kendaraan untuk meningkatkan kenyamanan berkendara, meminimalkan gejala limbung saat kecepatan tinggi, serta memberikan kendali (handling) yang lebih presisi di berbagai medan jalan.",
    leftBenefits: ["Pembongkaran & Pasang Per Pegas", "Penggantian Shock Absorber Baru", "Setting Ketinggian & Keempukan"],
    rightBenefits: ["Pengecekan Kaki-Kaki Komplit", "Ruang Tunggu AC & Wi-Fi", "Free Cuci Kolong Kendaraan"],
    duration: "150 menit",
    parts: "Per pegas, shock absorber",
    price: "Rp 1.200.000",
    priceSuffix: "/ servis",
    stok: 2,
    jumlah_klik: 0,
  },
  {
    id: 5,
    title: "Servis AC Mobil",
    heroTitle: "Servis & Perawatan AC Mobil (Paket Perbaikan)",
    category: "Perbaikan",
    cardDescription: "Pemeriksaan dan pengisian ulang sistem pendingin AC mobil.",
    detailInfo: "🕒 Estimasi: 90 Menit | 👨‍🔧 Mekanik: AC Specialist | ⚡ 4 slot antrean tersedia hari ini",
    badges: ["Dingin Maksimal", "Bebas Bau"],
    detailedDescription:
      "Mengatasi masalah AC kurang dingin, bau tidak sedap, atau hembusan angin lemah. Proses perawatan mencakup pembersihan evaporator dan pengisian ulang komponen pendingin agar kabin kembali sejuk dan nyaman.",
    leftBenefits: ["Pengisian Ulang Freon R134a", "Pembersihan Filter & Evaporator AC", "Cek Kebocoran Selang Kompresor"],
    rightBenefits: ["Uji Suhu Kabin Digital", "Ruang Tunggu AC & Wi-Fi", "Free Fogging Anti Bakteri"],
    duration: "90 menit",
    parts: "Freon, pembersihan AC",
    price: "Rp 550.000",
    priceSuffix: "/ servis",
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
  const [bookingService, setBookingService] = useState(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [members, setMembers] = useState(() => {
    if (typeof window === "undefined") return [];
    const storedUser = window.localStorage.getItem("user");
    if (!storedUser) return [];
    const stored = window.localStorage.getItem("gearshift_members");
    return stored ? JSON.parse(stored) : [];
  });
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberWhatsapp, setMemberWhatsapp] = useState("");
  const [memberVehicle, setMemberVehicle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingPromo, setBookingPromo] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

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

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "user") {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

  function handleOpenBooking(service) {
    setBookingService(service);
    setIsBookingDialogOpen(true);
  }

  function handleCloseBooking() {
    setIsBookingDialogOpen(false);
    setBookingService(null);
  }

  function handleConfirmBooking(e) {
    e.preventDefault && e.preventDefault();
    if (!user) {
      // redirect guest to login before confirming
      window.location.href = "/login";
      return;
    }

    if (!bookingService) {
      setSuccessMessage("Silakan pilih layanan terlebih dahulu.");
      return;
    }

    if (!bookingDate || !bookingTime) {
      setSuccessMessage("Silakan pilih tanggal dan jam kedatangan.");
      return;
    }

    const stored = window.localStorage.getItem("gearshift_bookings");
    const bookings = stored ? JSON.parse(stored) : [];
    const newBooking = {
      id: Date.now(),
      serviceId: bookingService.id,
      serviceTitle: bookingService.title,
      date: bookingDate,
      time: bookingTime,
      promo: bookingPromo,
      notes: bookingNotes,
      userId: user?.id ?? null,
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem("gearshift_bookings", JSON.stringify([newBooking, ...bookings]));
    setSuccessMessage(`Booking antrean untuk ${newBooking.serviceTitle} pada ${newBooking.date} ${newBooking.time} berhasil.`);
    setBookingDate("");
    setBookingTime("");
    setBookingPromo("");
    setBookingNotes("");
    setIsBookingDialogOpen(false);
    setBookingService(null);
    setBookingDate("");
    setBookingTime("");
    setBookingPromo("");
    setBookingNotes("");
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
            {user ? (
              <>
                <a href="/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Dashboard
                </a>
                <button
                  onClick={() => {
                    window.localStorage.removeItem("user");
                    setUser(null);
                    window.location.href = "/";
                  }}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Masuk
                </a>
                <a href="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Daftar
                </a>
              </>
            )}
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
              {!user ? (
                <>
                  <a href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                    Mulai sekarang <FaArrowRight />
                  </a>
                  <a href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                    Sudah punya akun
                  </a>
                </>
              ) : null}
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
                    <p className="mt-4 text-sm leading-7 text-slate-600">{service.cardDescription}</p>
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
                        onClick={() => {
                          if (!user) {
                            window.location.href = "/login";
                            return;
                          }
                          handleOpenBooking(service);
                        }}
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
                    <p className="mt-3 text-sm leading-6 text-slate-600">{service.cardDescription}</p>
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
                <p className="mt-3 text-5xl font-bold">{user ? members.length : 0}</p>
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

        <Dialog open={isDialogOpen} title={activeService ? "Detail Layanan" : "Memuat detail layanan..."} onClose={handleCloseDetail}>
          {activeService ? (
            <div className="space-y-6 text-slate-700">
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{activeService.category}</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">{activeService.heroTitle || activeService.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{activeService.detailInfo || `${activeService.duration} • ${activeService.parts}`}</p>
                  </div>
                  <div className="rounded-3xl bg-blue-600 px-4 py-3 text-right text-white">
                    <p className="text-sm opacity-80">Harga</p>
                    <p className="mt-1 text-xl font-semibold">{activeService.price}</p>
                    <p className="text-xs text-blue-100">{activeService.priceSuffix}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(activeService.badges || []).map((badge) => (
                    <span key={badge} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{badge}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm leading-7 text-slate-600">{activeService.detailedDescription}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-semibold text-slate-900">Cakupan Pengerjaan</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    {(activeService.leftBenefits || []).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 text-green-600">✅</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-semibold text-slate-900">Fasilitas & Tambahan</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    {(activeService.rightBenefits || []).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 text-green-600">✅</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={handleCloseDetail} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-600">Memuat detail layanan...</p>
          )}
        </Dialog>

        <Dialog open={isBookingDialogOpen} title={bookingService ? `Booking ${bookingService.title}` : "Booking layanan"} onClose={handleCloseBooking}>
          {bookingService ? (
            <form onSubmit={handleConfirmBooking} className="space-y-6 text-slate-700">
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{bookingService.category}</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">{bookingService.heroTitle || bookingService.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{bookingService.detailInfo || `${bookingService.duration} • ${bookingService.parts}`}</p>
                  </div>
                  <div className="rounded-3xl bg-blue-600 px-4 py-3 text-right text-white">
                    <p className="text-sm opacity-80">Harga</p>
                    <p className="mt-1 text-xl font-semibold">{bookingService.price}</p>
                    <p className="text-xs text-blue-100">{bookingService.priceSuffix}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(bookingService.badges || []).map((badge) => (
                    <span key={badge} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{badge}</span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Tanggal Servis</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Jam Kedatangan</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="--:--"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Kolom Kode Promo</label>
                <input
                  type="text"
                  value={bookingPromo}
                  onChange={(e) => setBookingPromo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Masukkan kode promo jika ada"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Keluhan / Catatan (opsional)</label>
                <textarea
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder='Keluhan kendaraan / tipe kendaraan / catatan khusus (opsional)'
                  className="w-full min-h-20 px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <p className="mt-2 text-sm text-slate-500">Contoh: "Rem depan bunyi derit, ganti oli sekalian"</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">Sisa slot hari ini: <span className="font-semibold text-blue-700">{bookingService.stok}</span></div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleCloseBooking} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Batal</button>
                  <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Konfirmasi Booking Antrean</button>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-slate-600">Memuat informasi booking...</p>
          )}
        </Dialog>

        <section id="cta" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="rounded-4xl border border-blue-200 bg-blue-50 p-8 text-center lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Siap mencoba?</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Buka GearShift dan kelola bengkel Anda lebih nyaman.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {!user ? (
                <>
                  <a href="/register" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                    Daftar sekarang
                  </a>
                  <a href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                    Masuk ke akun
                  </a>
                </>
              ) : null}
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

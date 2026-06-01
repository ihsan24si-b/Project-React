import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  Button,
  Badge,
  Avatar,
  Card,
  ProductCard,
  Table,
  Footer,
  Alert,
  Navbar,
  Breadcrumb,
  Tag,
  Toast,
} from '../components';
import { Input, Select, Dialog } from '@/components/ui';

export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const tableHeaders = ['No', 'Customer', 'Status', 'Total'];
  const tableRows = [
    ['1', 'Budi Santoso', 'Paid', 'Rp 2.500.000'],
    ['2', 'Siti Aminah', 'Pending', 'Rp 1.200.000'],
    ['3', 'Ahmad Rifai', 'Canceled', 'Rp 0'],
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="container mx-auto space-y-6">
        <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card title="Buttons">
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setToastMessage('Primary button clicked')}>Primary</Button>
                  <Button type="secondary">Secondary</Button>
                  <Button type="danger">Danger</Button>
                </div>
              </Card>

              <Card title="Inputs & Forms">
                <div className="space-y-4">
                  <Input label="Nama Customer" placeholder="Masukkan nama" />
                  <Select
                    label="Status Order"
                    options={['Pending', 'Paid', 'Canceled']}
                  />
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Badges & Tags">
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge>Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Tag>New</Tag>
                  <Tag>Hot</Tag>
                </div>
              </Card>

              <Card title="Profile Avatar">
                <div className="flex items-center gap-4">
                  <Avatar name="Rina" />
                  <div>
                    <p className="font-semibold">Rina Putri</p>
                    <p className="text-sm text-slate-500">Customer Success</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card title="CRM Table">
              <Table headers={tableHeaders} rows={tableRows} />
            </Card>

            <Card title="Product Card">
              <ProductCard
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                title="Sepatu Sport"
                category="Fashion"
                price="Rp 450.000"
                description="Sepatu nyaman dengan desain modern untuk kegiatan sehari-hari dan olahraga ringan."
              />
            </Card>

            <Card title="Feedback Components">
              <div className="space-y-3">
                <Alert type="info">Info: Update terbaru siap untuk di-deploy.</Alert>
                <Alert type="success">Success: Pembayaran berhasil diproses.</Alert>
                <Alert type="warning">Warning: Persediaan hampir habis.</Alert>
                <Alert type="danger">Danger: Terjadi error saat menyimpan data.</Alert>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button onClick={() => setModalOpen(true)}>Open Dialog</Button>
                <Button type="secondary" onClick={() => setToastMessage('Toast shown!')}>Show Toast</Button>
              </div>
            </Card>

            <Card title="Layout Components">
              <div className="space-y-4">
                <Breadcrumb items={['CRM', 'Components']} />
                <Navbar>
                  <div className="flex items-center gap-4 text-slate-700">
                    <span className="font-semibold">CRM</span>
                    <a href="#" className="text-slate-500 hover:text-slate-900">Dashboard</a>
                    <a href="#" className="text-slate-500 hover:text-slate-900">Orders</a>
                    <a href="#" className="text-slate-500 hover:text-slate-900">Customers</a>
                  </div>
                </Navbar>
              </div>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card title="Component Preview">
              <div className="grid gap-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-slate-600 text-sm">Gunakan komponen ini untuk membangun halaman CRM dengan layout yang konsisten.</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold">Header</p>
                    <p className="text-sm text-slate-500">Sesuai dengan fitur notifikasi dan profil di header umum aplikasi.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold">Sidebar</p>
                    <p className="text-sm text-slate-500">Sidebar dapat memuat navigasi utama seperti Dashboard, Order, Spareparts.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Page Footer">
              <Footer>GearShift CRM Demo © 2026</Footer>
            </Card>
          </aside>
        </div>
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} title="Contoh Dialog">
        <p className="text-slate-600">Ini adalah ruang dialog demo untuk komponen UI.</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setModalOpen(false)}>Tutup</Button>
        </div>
      </Dialog>

      <Toast message={toastMessage} />
    </div>
  );
}

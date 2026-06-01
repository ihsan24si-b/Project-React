import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy Load Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Lazy Load Pages (Tema Bengkel)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const ServiceQueue = React.lazy(() => import("./pages/ServiceQueue")); // Pengganti Orders
const Spareparts = React.lazy(() => import("./pages/Spareparts"));      // Pengganti Customers
const SparepartDetail = React.lazy(() => import("./pages/SparepartDetail"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Components = React.lazy(() => import("./pages/Components"));

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Main Layout: Membutuhkan Sidebar & Header */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/services" element={<ServiceQueue />} />
                    <Route path="/spareparts" element={<Spareparts />} />
                    <Route path="/spareparts/:id" element={<SparepartDetail />} />
                    <Route path="/components" element={<Components />} />
                </Route>

                {/* Auth Layout: Halaman Polos (Login/Register) */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<Forgot />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
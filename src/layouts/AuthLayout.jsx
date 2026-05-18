import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-blue-600">
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-4xl font-poppins font-black text-slate-800 italic tracking-tight">
                        GEAR<span className="text-blue-600">SHIFT</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium mt-1">Workshop Management System</p>
                </div>

                <Outlet/>

                <p className="text-center text-sm text-gray-400 mt-8">
                    © 2026 GearShift Workshop. All rights reserved.
                </p>
            </div>
        </div>
    )
}
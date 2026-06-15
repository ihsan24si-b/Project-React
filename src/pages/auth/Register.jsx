import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase"; 

export default function Register() {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Handler untuk mendeteksi perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    // Handler saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validasi kecocokan password
        if (dataForm.password !== dataForm.confirmPassword) {
            alert("Password tidak sama");
            return;
        }

        try {
            // 2. Cek apakah email sudah terdaftar di database
            const { data: existingUser } = await supabase
                .from("user")
                .select("*")
                .eq("email", dataForm.email);

            if (existingUser && existingUser.length > 0) {
                alert("Email sudah digunakan");
                return;
            }

            // 3. Insert data ke tabel 'user' (Role disesuaikan jadi 'mechanic')
            const { error } = await supabase
                .from("user")
                .insert([
                    {
                        email: dataForm.email,
                        password: dataForm.password,
                        role: "mechanic", 
                    },
                ]);

            if (error) {
                alert(error.message);
                return;
            }

            alert("Registrasi berhasil!");
            navigate("/login"); // Pindah ke halaman login setelah sukses
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">
                Register Mechanic ✨
            </h2>

            <form onSubmit={handleSubmit}>
                {/* EMAIL ADDRESS */}
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
                        placeholder="mechanic@gearshift.com"
                        required
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-lg shadow-blue-600/30"
                >
                    Create Account
                </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
            </p>
        </div>
    );
}
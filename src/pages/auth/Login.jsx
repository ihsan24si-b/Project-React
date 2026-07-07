import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        // Try Supabase auth first
        try {
          const { data, error: supaError } = await supabase.auth.signInWithPassword({
            email: dataForm.email,
            password: dataForm.password,
          });

          if (!supaError && data && data.user) {
            const u = data.user;
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("role, full_name")
              .eq("id", u.id)
              .single();

            const role = profile?.role || (u.email === "admin@gmail.com" ? "admin" : "member");
            const name = profile?.full_name || (u.user_metadata && u.user_metadata.full_name) || u.email;
            const userObj = {
              id: u.id ?? "",
              email: u.email,
              role,
              name,
              createdAt: new Date().toISOString(),
            };

            localStorage.setItem("user", JSON.stringify(userObj));
            if (role === "admin") navigate("/admin");
            else navigate("/member/dashboard");
            setLoading(false);
            return;
          }
        } catch (err) {
          // continue to fallback
        }

        // Fallback to localStorage-based auth (existing behavior)
        const storedUsers = localStorage.getItem("gearshift_users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const existingUser = users.find(
            (user) => user.email === dataForm.email && user.password === dataForm.password
        );

        // Also allow a hardcoded admin credential fallback
        if (!existingUser && dataForm.email === "admin@gmail.com" && dataForm.password === "admin123") {
            const adminUser = {
                id: "admin",
                email: "admin@gmail.com",
                role: "admin",
                name: "Administrator",
                createdAt: new Date().toISOString(),
            };
            localStorage.setItem("user", JSON.stringify(adminUser));
            navigate("/admin");
            setLoading(false);
            return;
        }

        if (!existingUser) {
            setError("Email atau password salah");
            setLoading(false);
            return;
        }

        localStorage.setItem("user", JSON.stringify(existingUser));
        navigate("/member/dashboard");
        setLoading(false);
};

  const errorInfo = error ? (
    <div className="bg-red-100 border border-red-200 mb-5 p-4 text-sm font-medium text-red-600 rounded-lg flex items-center">
      <BsFillExclamationDiamondFill className="mr-2 text-lg" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-blue-50 border border-blue-100 mb-5 p-4 text-sm font-medium text-blue-600 rounded-lg flex items-center">
      <ImSpinner2 className="mr-2 animate-spin text-lg" />
      Starting Engine...
    </div>
  ) : null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">
        Mechanic Portal 👋
      </h2>
      {errorInfo}
      {loadingInfo}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Username / ID
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
            placeholder="emilys"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="flex text-sm font-bold text-slate-700 mb-2 justify-between">
            <span>Password</span>
            <Link to="/forgot" className="text-blue-600 hover:underline text-xs font-semibold">Forgot Password?</Link>
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            id="password"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-lg shadow-blue-600/30"
        >
          Login to Dashboard
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        New mechanic? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
      </p>
    </div>
  );
}
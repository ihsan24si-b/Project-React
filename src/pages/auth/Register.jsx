import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">
                Register Mechanic ✨
            </h2>

            <form>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
                        placeholder="mechanic@gearshift.com"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-400"
                        placeholder="********"
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
    )
}
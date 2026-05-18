import { Link } from "react-router-dom";

export default function Forgot() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2 text-center">
                Forgot Password?
            </h2>
            
            <p className="text-sm text-slate-500 mb-6 text-center">
                Enter your registered email and we'll send you instructions to reset your password.
            </p>

            <form>
                <div className="mb-6">
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
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-lg shadow-blue-600/30"
                >
                    Send Reset Link
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
                Remember your password? <Link to="/login" className="text-blue-600 font-bold hover:underline">Back to Login</Link>
            </p>
        </div>
    )
}
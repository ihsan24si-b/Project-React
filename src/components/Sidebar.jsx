import { MdSpaceDashboard, MdCarRepair, MdBuild, MdError, MdLock, MdBlock } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const menuClass = "flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:font-bold";

    return (
        <div id="sidebar" className="flex min-h-screen w-80 flex-col bg-white p-8 shadow-xl border-r border-gray-100">
            <div id="sidebar-logo" className="flex flex-col mb-10">
                <span id="logo-title" className="font-poppins text-[40px] font-black text-slate-800 italic tracking-tight">
                    GEAR<b id="logo-dot" className="text-blue-600">SHIFT</b>
                </span>
                <span id="logo-subtitle" className="font-medium text-sm text-gray-400">Workshop Management</span>
            </div>

            <div id="sidebar-menu" className="flex-1">
                <ul id="menu-list" className="space-y-2">
                    <li>
                        <Link to="/" id="menu-1" className={menuClass}>
                            <MdSpaceDashboard className="mr-3 text-2xl" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" id="menu-2" className={menuClass}>
                            <MdCarRepair className="mr-3 text-2xl" /> Service Queue
                        </Link>
                    </li>
                    <li>
                        <Link to="/spareparts" id="menu-3" className={menuClass}>
                            <MdBuild className="mr-3 text-2xl" /> Spareparts
                        </Link>
                    </li>
                    <li>
                        <Link to="/components" id="menu-4" className={menuClass}>
                            <MdBuild className="mr-3 text-2xl" /> Components
                        </Link>
                    </li>

                    <li className="pt-6 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Pages</span>
                    </li>
                    <li>
                        <Link to="/error-400" className={menuClass}>
                            <MdError className="mr-3 text-2xl text-orange-500" /> Error 400
                        </Link>
                    </li>
                    <li>
                        <Link to="/error-401" className={menuClass}>
                            <MdLock className="mr-3 text-2xl text-red-400" /> Error 401
                        </Link>
                    </li>
                    <li>
                        <Link to="/error-403" className={menuClass}>
                            <MdBlock className="mr-3 text-2xl text-red-600" /> Error 403
                        </Link>
                    </li>
                </ul>
            </div>

            <div id="sidebar-footer" className="mt-auto pt-8 border-t border-gray-100">
                <div id="footer-card" className="bg-blue-600 px-4 py-4 rounded-xl shadow-lg mb-6 flex items-center justify-between">
                    <div id="footer-text" className="text-white text-sm">
                        <span className="font-medium block mb-2">Need Help?</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 bg-white rounded-lg text-blue-600 font-bold cursor-pointer hover:bg-gray-100 transition-colors">
                            <span>Contact IT</span>
                        </div>
                    </div>
                </div>
                <span id="footer-brand" className="font-bold text-gray-500 block">GearShift Workshop</span>
                <p id="footer-copyright" className="text-xs text-gray-400 mt-1">&copy; 2026 All Rights Reserved</p>
            </div>
        </div>
    );
}
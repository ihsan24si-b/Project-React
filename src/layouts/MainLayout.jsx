import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout(){
    const location = useLocation();
    const hideSidebar = location.pathname === "/member/dashboard";

    return(
        <div id="app-container" className="bg-slate-50 min-h-screen flex font-sans text-slate-800">
            <div id="layout-wrapper" className="flex flex-row flex-1">
                {!hideSidebar && <Sidebar />}
                <div id="main-content" className="flex-1 p-6 flex flex-col h-screen overflow-y-auto">
                    <Header />
                    <div className="mt-4">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}
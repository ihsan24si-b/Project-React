import { FaUsers, FaShoppingCart, FaDollarSign, FaClock, FaArrowUp, FaArrowDown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const metrics = [
    {
        label: "Total User",
        value: "40,689",
        rate: "8.5%",
        trend: "up",
        description: "Up from yesterday",
        bg: "bg-sky-100 text-sky-600",
        icon: FaUsers,
    },
    {
        label: "Total Order",
        value: "10,293",
        rate: "1.3%",
        trend: "up",
        description: "Up from past week",
        bg: "bg-emerald-100 text-emerald-600",
        icon: FaShoppingCart,
    },
    {
        label: "Total Sales",
        value: "$89,000",
        rate: "4.3%",
        trend: "down",
        description: "Down from yesterday",
        bg: "bg-amber-100 text-amber-600",
        icon: FaDollarSign,
    },
    {
        label: "Total Pending",
        value: "2,040",
        rate: "1.8%",
        trend: "up",
        description: "Up from yesterday",
        bg: "bg-violet-100 text-violet-600",
        icon: FaClock,
    },
];

const notifications = [
    {
        title: "Settings",
        description: "Update dashboard",
        variant: "bg-sky-100 text-sky-600",
    },
    {
        title: "Event Update",
        description: "An event date update again",
        variant: "bg-emerald-100 text-emerald-600",
    },
    {
        title: "Profile",
        description: "Update your profile",
        variant: "bg-violet-100 text-violet-600",
    },
    {
        title: "Application Error",
        description: "Check your running application",
        variant: "bg-rose-100 text-rose-600",
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <PageHeader title="Dashboard" breadcrumb="Overview">
                <button className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-2xl font-semibold hover:bg-slate-900 transition-all shadow-lg">
                    + Generate Report
                </button>
            </PageHeader>

            <div className="grid gap-6 lg:grid-cols-[repeat(3,1fr)]">
                {metrics.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.label} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                                    <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
                                </div>
                                <div className={`rounded-3xl p-3 ${item.bg}`}>
                                    <Icon className="text-2xl" />
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                                <span className="flex items-center gap-2">
                                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${item.trend === "up" ? "bg-emerald-200 text-emerald-700" : "bg-rose-200 text-rose-700"}`}>
                                        {item.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                                    </span>
                                    <span className="font-semibold text-slate-700">{item.rate}</span>
                                </span>
                                <span>{item.description}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Sales Details</p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-900">Sales Overview</h2>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                                <span className="font-semibold">October</span>
                                <span className="text-slate-400">▾</span>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total sales</p>
                                <p className="mt-3 text-xl font-bold text-slate-900">$89,000</p>
                                <p className="mt-2 text-sm text-slate-500">Monthly target achieved</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Target</p>
                                <p className="mt-3 text-xl font-bold text-slate-900">$120,000</p>
                                <p className="mt-2 text-sm text-slate-500">72% achieved</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Growth</p>
                                <p className="mt-3 text-xl font-bold text-slate-900">+14.2%</p>
                                <p className="mt-2 text-sm text-slate-500">Compared to last month</p>
                            </div>
                        </div>

                        <div className="mt-8 rounded-4xl bg-slate-900 p-6 text-white relative overflow-hidden">
                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-slate-700 opacity-30" />
                            <div className="absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-slate-700 opacity-20" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Sales Chart</p>
                                        <p className="mt-2 text-3xl font-bold">$42,300</p>
                                    </div>
                                    <div className="rounded-3xl bg-white/10 px-3 py-2 text-sm text-slate-200">+8.2%</div>
                                </div>
                                <div className="mt-8 h-52 w-full">
                                    <div className="relative h-full w-full">
                                        <div className="absolute bottom-0 left-0 h-2 w-full rounded-full bg-slate-700/60" />
                                        <div className="absolute left-[10%] bottom-10 h-16 w-2 rounded-full bg-sky-400" />
                                        <div className="absolute left-[24%] bottom-16 h-24 w-2 rounded-full bg-sky-300" />
                                        <div className="absolute left-[38%] bottom-6 h-36 w-2 rounded-full bg-sky-400" />
                                        <div className="absolute left-[52%] bottom-20 h-28 w-2 rounded-full bg-sky-300" />
                                        <div className="absolute left-[66%] bottom-12 h-22 w-2 rounded-full bg-sky-400" />
                                        <div className="absolute left-[80%] bottom-32 h-36 w-2 rounded-full bg-sky-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Recent Activities</p>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">Latest updates</h3>
                            </div>
                            <button className="px-4 py-2 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all">
                                View All
                            </button>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="font-semibold text-slate-900">New order received</p>
                                <p className="mt-1 text-sm text-slate-500">Order #2034 has been confirmed and scheduled for delivery.</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="font-semibold text-slate-900">Server maintenance</p>
                                <p className="mt-1 text-sm text-slate-500">Database optimization completed successfully.</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="font-semibold text-slate-900">Customer query solved</p>
                                <p className="mt-1 text-sm text-slate-500">Support ticket #507 has been closed.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-white shadow-sm">
                        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Notification</p>
                                    <h3 className="mt-2 text-2xl font-bold">System Alerts</h3>
                                </div>
                                <div className="rounded-3xl bg-white/10 px-3 py-2 text-xs text-slate-200">4 New</div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {notifications.map((item) => (
                                    <div key={item.title} className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
                                        <div>
                                            <p className="font-semibold text-white">{item.title}</p>
                                            <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                                        </div>
                                        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${item.variant}`}>
                                            •
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Performance</p>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">Weekly Trends</h3>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Updated now</span>
                        </div>
                        <div className="mt-6 grid gap-4">
                            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-sm text-slate-500">Conversion Rate</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">4.8%</p>
                                </div>
                                <span className="text-emerald-600 font-semibold">+2.1%</span>
                            </div>
                            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-sm text-slate-500">New Clients</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">120</p>
                                </div>
                                <span className="text-sky-600 font-semibold">+6.4%</span>
                            </div>
                            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-sm text-slate-500">Active Projects</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">18</p>
                                </div>
                                <span className="text-violet-600 font-semibold">+1.7%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

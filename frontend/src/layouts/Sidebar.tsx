import { type JSX } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.svg"
import { FormattedMessage } from "react-intl";
import { APP_NAME } from "../config/app";

type SubMenuItem = {
    title: string;
    icon: JSX.Element;
    id: string;
};

type MenuItem = {
    title: JSX.Element ;
    icon: string;
    id: string;
    submenu: SubMenuItem[];
    path: string;
    active: boolean;
};

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const activeItem = location.pathname.replace("/", "");

    const menuItems: MenuItem[] = [
        {
            title: <FormattedMessage id="dashboard" />,
            icon: 'dashboard',
            id: "dashboard",
            submenu: [],
            path: "/dashboard",
            active: true
        },
        {
            title: <FormattedMessage id="alert_logs" />,
            icon: 'history_edu',
            id: "alertLogs",
            submenu: [],
            path: "/alertLogs",
            active: false
        },
        {
            title: <FormattedMessage id="bed_activity" />,
            icon: "bed",
            id: "bedactivity",
            submenu: [],
            path: "/bedactivity",
            active: false
        },
        {
            title: <FormattedMessage id="analytics" />,
            icon: "analytics",
            id: "analytics",
            submenu: [],
            path: "/analytics",
            active: false
        },
    ];

    const handleOnClick = (id: string) => {
        const menu = menuItems.filter((m) => m.id === id)
        navigate(menu[0].path);
    }

    return (
        <div className="relative">

            <aside className="fixed left-0 top-0 h-screen w-64 border-r-0 bg-white  font-manrope z-40">
                <div className="flex flex-col h-full py-6">
                    <div className="px-6 mb-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] flex items-center justify-center text-white">
                            <span className="material-symbols-outlined font-fill">Falling</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <h1 className="text-2xl font-black text-blue-900 tracking-tight leading-none">
                                    {APP_NAME}
                                </h1>

                                <div className="overflow-hidden flex items-center justify-center">
                                    <img
                                        src={logo}
                                        className="h-8 w-auto"
                                        alt={`${APP_NAME} logo`}
                                    />
                                </div>
                            </div>
                            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold"><FormattedMessage id="fall_prevention_solution" /></p>
                        </div>
                    </div>

                    <nav className="flex-1 px-3 space-y-1">
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href="#"
                                className={`flex items-center gap-3 px-4 py-3 rounded-r-full transition-all ${item.id === activeItem
                                    ? "text-blue-700  font-bold bg-blue-50/50  scale-95"
                                    : "text-slate-500  hover:text-blue-600 hover:bg-slate-100 "
                                    }`}
                                onClick={() => handleOnClick(item.id)}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.title}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="px-3 mt-auto space-y-1 border-t border-slate-200 pt-4">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-blue-600 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                            <span><FormattedMessage id="setting" /></span>
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;


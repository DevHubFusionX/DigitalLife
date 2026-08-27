import { useLocation, NavLink } from 'react-router-dom';
import { Search, Bell, Info, Menu, ChevronDown } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useLeads } from '../../hooks/useLeads';

const NAV_TABS = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/resources', label: 'Resources' },
  { to: '/admin/leads', label: 'Leads & Orders' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/videos', label: 'Videos' },
  { to: '/admin/playbooks', label: 'Playbooks' },
  { to: '/admin/settings', label: 'Settings' },
];

interface AdminTopBarProps {
  onMenuClick?: () => void;
}

export default function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  const { pathname } = useLocation();
  const { user } = useAdminAuth();
  const { leads } = useLeads();

  const newLeadsCount = leads.filter((l) => {
    const diffHours = (Date.now() - new Date(l.createdAt).getTime()) / (1000 * 60 * 60);
    return diffHours < 24;
  }).length;

  const adminName = user?.email?.split('@')[0] || 'Admin';

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-[#f8f9fa] border-b border-slate-200/80 shrink-0 select-none z-20">
      {/* Left: Mobile hamburger & Brand Name */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-white lg:hidden border-none bg-transparent cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff5f38] to-[#ea580c] flex items-center justify-center text-white font-black text-xs shadow-xs">
            D
          </div>
          <span className="text-sm font-black text-slate-900 tracking-tight hidden sm:inline">
            Digitalife
          </span>
        </div>
      </div>

      {/* Center: Top Pill Navigation Bar (Desktop) */}
      <nav className="hidden md:flex items-center bg-white border border-slate-200/80 rounded-full p-1 shadow-xs">
        {NAV_TABS.map(({ to, label }) => {
          const isActive = pathname === to || (to !== '/admin/dashboard' && pathname.startsWith(to));
          return (
            <NavLink
              key={to}
              to={to}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 no-underline ${
                isActive
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {label}
            </NavLink>
          );
        })}
      </nav>

      {/* Right: Search, Notification Bell, Info, and User Profile Pill */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search icon button */}
        <button
          className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          title="Search"
          onClick={() => {
            const input = document.getElementById('dashboard-table-search');
            input?.focus();
          }}
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          {newLeadsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff5f38] ring-2 ring-white animate-pulse" />
          )}
        </div>

        {/* Info button */}
        <button
          className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 hidden sm:flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          title="Help & System Info"
          onClick={() => alert(`Digitalife Admin System v2.0 • Project: ${import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Connected'}`)}
        >
          <Info className="w-4 h-4" />
        </button>

        {/* User Profile Chip */}
        <div className="flex items-center gap-2.5 pl-2 pr-3 py-1 bg-white border border-slate-200/80 rounded-full shadow-xs cursor-pointer hover:border-slate-300 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-[#ff5f38] flex items-center justify-center text-white text-[11px] font-black shrink-0">
            {adminName[0]?.toUpperCase()}
          </div>
          <div className="text-left hidden lg:block leading-none">
            <p className="text-xs font-bold text-slate-900 capitalize leading-tight">
              {adminName}
            </p>
            <p className="text-[9px] text-slate-400 font-semibold truncate max-w-28 leading-tight">
              {user?.email}
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

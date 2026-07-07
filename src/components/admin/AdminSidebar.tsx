import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Youtube, Settings, LogOut, ChevronLeft, ChevronRight, BookOpen, Users } from 'lucide-react';
import { useState } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/resources', icon: FileText, label: 'Resources' },
  { to: '/admin/videos', icon: Youtube, label: 'Video Resources' },
  { to: '/admin/playbooks', icon: Users, label: 'Expert Playbooks' },
  { to: '/admin/blog', icon: BookOpen, label: 'Blog Posts' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  return (
    <aside
      className={`relative flex flex-col bg-slate-950 text-white transition-all duration-300 shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5 overflow-hidden">
        <div className="w-8 h-8 bg-[#ffd148] rounded-lg flex items-center justify-center shrink-0">
          <span className="text-slate-950 font-black text-xs">D</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-[11px] font-black uppercase tracking-widest text-white leading-none">
              Digitalife
            </p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 grow">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-[#3e4095]/30 text-white border-l-2 border-[#ffd148]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all w-full ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-7 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-white" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-white" />
        )}
      </button>
    </aside>
  );
}

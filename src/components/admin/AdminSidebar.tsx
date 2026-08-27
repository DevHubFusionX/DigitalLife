import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Youtube, Settings, LogOut, BookOpen, Users, Mail, Sun, Moon, HelpCircle, Shield } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/resources', icon: FileText, label: 'Resources' },
  { to: '/admin/leads', icon: Mail, label: 'Leads & Orders' },
  { to: '/admin/blog', icon: BookOpen, label: 'Blog Posts' },
  { to: '/admin/videos', icon: Youtube, label: 'Video Library' },
  { to: '/admin/playbooks', icon: Users, label: 'Playbooks' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AdminSidebar({ mobileOpen = false, onMobileClose }: AdminSidebarProps) {
  const { signOut } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#f8f9fa] text-slate-700 select-none py-4 px-2 border-r border-slate-200/80 items-center justify-between">
      {/* Top: Brand Icon & Theme Indicator */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Brand Logo Icon */}
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff5f38] to-[#ea580c] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
          <Shield className="w-5 h-5" />
        </div>

        {/* Theme pill indicator */}
        <div className="p-1 rounded-2xl bg-white border border-slate-200/80 flex flex-col items-center gap-1 shadow-xs">
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="w-7 h-7 rounded-xl flex items-center justify-center text-slate-400">
            <Moon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Center: Main Nav Icons */}
      <nav className="flex flex-col items-center gap-2 w-full my-auto py-2">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => onMobileClose?.()}
            className={({ isActive }) =>
              `group relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 no-underline ${
                isActive
                  ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20 scale-105'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-xs'
              }`
            }
            title={label}
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {/* Floating tooltip */}
                <span className="absolute left-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Help & Logout */}
      <div className="flex flex-col items-center gap-2 w-full pt-2">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all text-slate-500 hover:text-slate-900 hover:bg-white ${
              isActive ? 'bg-white text-slate-950 shadow-xs' : ''
            }`
          }
          title="Settings & Help"
        >
          <HelpCircle className="w-4.5 h-4.5" />
          <span className="absolute left-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
            Help &amp; Docs
          </span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer border-none bg-transparent"
          title="Sign Out"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span className="absolute left-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Vertical Icon Rail */}
      <aside className="hidden lg:flex w-16 h-screen sticky top-0 shrink-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onMobileClose} />
          <aside className="relative w-20 max-w-[80vw] h-full z-10 shadow-2xl">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}

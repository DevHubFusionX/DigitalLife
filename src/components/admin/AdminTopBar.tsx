import { useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/resources': 'Resources',
  '/admin/videos': 'Video Resources',
  '/admin/settings': 'Settings',
};

export default function AdminTopBar() {
  const { pathname } = useLocation();
  const { user } = useAdminAuth();

  const title = PAGE_TITLES[pathname] ?? 'Admin';

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-black/5 shrink-0">
      <h2 className="text-sm font-black text-slate-950 tracking-tight">{title}</h2>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Signed in as
          </p>
          <p className="text-xs font-bold text-slate-700 truncate max-w-45">
            {user?.email ?? '—'}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#3e4095] flex items-center justify-center">
          <span className="text-white text-[11px] font-black">
            {user?.email?.[0]?.toUpperCase() ?? 'A'}
          </span>
        </div>
      </div>
    </header>
  );
}

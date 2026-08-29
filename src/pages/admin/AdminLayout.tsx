import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Shield } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

/**
 * Shell layout for all protected admin pages.
 * Navigation is handled exclusively by the AdminSidebar rail.
 */
export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f4f5f7] overflow-hidden antialiased">
      <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex flex-col grow min-w-0 overflow-hidden">
        {/* Mobile-only header to toggle sidebar when top bar is removed on desktop */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#f8f9fa] border-b border-slate-200/80 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-1.5 rounded-xl text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 bg-transparent cursor-pointer transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#ffd148] to-[#e6bd3e] flex items-center justify-center text-slate-950 font-black text-xs shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-slate-900 tracking-tight">
                Digitalife Admin
              </span>
            </div>
          </div>
        </div>

        <main className="grow overflow-y-auto p-4 sm:p-8 bg-[#f4f5f7]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopBar from '../../components/admin/AdminTopBar';

/**
 * Shell layout for all protected admin pages.
 * Features the vertical icon rail, top pill navigation header, and modern SaaS canvas.
 */
export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f4f5f7] overflow-hidden antialiased">
      <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex flex-col grow min-w-0 overflow-hidden">
        <AdminTopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="grow overflow-y-auto p-4 sm:p-8 bg-[#f4f5f7]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

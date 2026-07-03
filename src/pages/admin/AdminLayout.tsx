import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopBar from '../../components/admin/AdminTopBar';

/**
 * Shell layout for all protected admin pages.
 * Renders the sidebar + top bar, and injects child routes via <Outlet />.
 */
export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col grow min-w-0 overflow-hidden">
        <AdminTopBar />
        <main className="grow overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

/**
 * Guards all admin routes behind Firebase Auth.
 * - While auth is resolving → shows a spinner.
 * - Not authenticated → redirects to /admin (login).
 * - Authenticated → renders child routes via <Outlet />.
 */
export default function ProtectedAdminRoute() {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#ffd148] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

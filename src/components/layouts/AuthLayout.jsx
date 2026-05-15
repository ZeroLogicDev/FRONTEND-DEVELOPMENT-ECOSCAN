import { Outlet } from 'react-router-dom';

/**
 * Layout for authentication pages (login, callback).
 * No sidebar or bottom nav — clean, focused layout.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-950 via-surface-900 to-eco-950 flex items-center justify-center px-4">
      <Outlet />
    </div>
  );
}

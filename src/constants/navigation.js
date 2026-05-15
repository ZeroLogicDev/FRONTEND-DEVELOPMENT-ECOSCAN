import {
  LayoutDashboard,
  ScanLine,
  History,
  UserCircle,
} from 'lucide-react';
import { ROUTES } from './routes';

/**
 * Navigation items used by both Sidebar (desktop) and BottomNav (mobile).
 * Single source of truth for menu structure.
 */
export const NAV_ITEMS = [
  {
    key: 'dashboard',
    labelKey: 'nav.dashboard', // i18n key
    icon: LayoutDashboard,
    path: ROUTES.DASHBOARD,
  },
  {
    key: 'scan',
    labelKey: 'nav.scan',
    icon: ScanLine,
    path: ROUTES.SCAN,
    primary: true, // Highlighted CTA in bottom nav
  },
  {
    key: 'history',
    labelKey: 'nav.history',
    icon: History,
    path: ROUTES.HISTORY,
  },
  {
    key: 'profile',
    labelKey: 'nav.profile',
    icon: UserCircle,
    path: ROUTES.PROFILE,
  },
];

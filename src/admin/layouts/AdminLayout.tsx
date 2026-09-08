import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';

interface NavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  visible: boolean;
}

export function AdminLayout() {
  const { user, logout } = useAuth();
  const perms = usePermissions();

  const groups: NavGroup[] = [
    { title: '', items: [{ to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true }], visible: true },
    {
      title: 'Website',
      visible: perms.canManageWebsite,
      items: [
        { to: '/admin/website/homepage', label: 'Homepage', icon: 'home_app_logo' },
        { to: '/admin/website/header', label: 'Header', icon: 'view_headline' },
        { to: '/admin/website/branding', label: 'Branding', icon: 'palette' },
        { to: '/admin/website/media', label: 'Media Library', icon: 'perm_media' },
      ],
    },
    {
      title: 'Menu',
      visible: perms.canManageMenu,
      items: [
        { to: '/admin/menu/categories', label: 'Categories', icon: 'category' },
        { to: '/admin/menu/items', label: 'Menu Items', icon: 'restaurant_menu' },
        { to: '/admin/menu/addons', label: 'Add-ons', icon: 'add_circle' },
        { to: '/admin/menu/offers', label: 'Offers', icon: 'local_offer' },
      ],
    },
    {
      title: 'Restaurant',
      visible: perms.canManageBranding,
      items: [
        { to: '/admin/restaurant/information', label: 'Information', icon: 'storefront' },
        { to: '/admin/restaurant/contact', label: 'Contact', icon: 'call' },
        { to: '/admin/restaurant/hours', label: 'Opening Hours', icon: 'schedule' },
        { to: '/admin/restaurant/social', label: 'Social Media', icon: 'share' },
      ],
    },
    {
      title: 'Settings',
      visible: true,
      items: [
        { to: '/admin/settings/account', label: 'Account', icon: 'person' },
        ...(perms.canManageUsers ? [{ to: '/admin/settings/users', label: 'Users', icon: 'group' }] : []),
      ],
    },
  ];

  return (
    <div className="min-h-screen flex bg-surface-container-low font-sans">
      <aside className="w-64 shrink-0 bg-surface border-r border-outline-variant/20 flex flex-col">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-outline-variant/20">
          <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
          <span className="font-serif text-lg font-bold text-on-surface">Admin Panel</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {groups.filter((g) => g.visible).map((group, idx) => (
            <div key={idx}>
              {group.title && (
                <div className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-widest text-secondary">{group.title}</div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-primary/10 text-primary font-bold' : 'text-secondary hover:bg-surface-container-high hover:text-on-surface'
                      }`
                    }
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {user?.name?.[0] ?? '?'}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-on-surface truncate">{user?.name}</div>
              <div className="text-xs text-secondary capitalize truncate">{user?.role.replace('_', ' ')}</div>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-outline-variant/40 text-sm font-medium text-secondary hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

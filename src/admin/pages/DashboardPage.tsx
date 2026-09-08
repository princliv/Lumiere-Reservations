import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMenu } from '../hooks/api/useMenu';
import { useOffers } from '../hooks/api/useOffers';
import { useAddons } from '../hooks/api/useAddons';
import { useWebsiteStatus } from '../hooks/api/useWebsite';
import { StatusPill } from '../components/StatusPill';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: menu } = useMenu();
  const { data: offers } = useOffers();
  const { data: addons } = useAddons();
  const { data: website } = useWebsiteStatus();

  const items = menu?.items ?? [];
  const available = items.filter((i) => i.isAvailable).length;
  const unavailable = items.length - available;

  const cards = [
    { label: 'Menu Items', value: items.length, icon: 'restaurant_menu', to: '/admin/menu/items' },
    { label: 'Categories', value: menu?.categories.length ?? 0, icon: 'category', to: '/admin/menu/categories' },
    { label: 'Active Offers', value: offers?.filter((o) => o.isActive).length ?? 0, icon: 'local_offer', to: '/admin/menu/offers' },
    { label: 'Add-ons', value: addons?.length ?? 0, icon: 'add_circle', to: '/admin/menu/addons' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-on-surface">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-secondary text-sm mt-1">Here's what's happening with your restaurant website.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.to)}
            className="text-left bg-surface rounded-2xl p-5 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-primary text-2xl">{card.icon}</span>
            <div className="text-2xl font-bold text-on-surface mt-2">{card.value}</div>
            <div className="text-xs text-secondary font-medium">{card.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-on-surface mb-4">Website Status</h3>
          <StatusPill label={website?.publishStatus === 'published' ? 'Published' : 'Draft'} tone={website?.publishStatus === 'published' ? 'positive' : 'warning'} />
          {website?.publishedAt && (
            <p className="text-xs text-secondary mt-3">Last published {new Date(website.publishedAt).toLocaleString()}</p>
          )}
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-on-surface mb-4">Menu Availability</h3>
          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-xl font-bold text-green-700">{available}</div>
              <div className="text-secondary">Available</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-700">{unavailable}</div>
              <div className="text-secondary">Unavailable</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-on-surface mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/admin/website/homepage')} className="px-4 py-2 rounded-xl border border-outline-variant/40 text-sm font-medium hover:bg-surface-container-high transition-colors">
            Edit Website
          </button>
          <button onClick={() => navigate('/admin/menu/items')} className="px-4 py-2 rounded-xl border border-outline-variant/40 text-sm font-medium hover:bg-surface-container-high transition-colors">
            Manage Menu
          </button>
          <button onClick={() => navigate('/admin/menu/items/new')} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-colors">
            + Add Menu Item
          </button>
        </div>
      </div>
    </div>
  );
}

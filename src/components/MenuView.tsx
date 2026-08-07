import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  prepTime: string;
  badge?: string;
  isVeg?: boolean;
}

const ALL_MENU_ITEMS: MenuItem[] = [
  // Popular Choices
  {
    id: '1',
    name: 'Classic Lumière Burger',
    category: 'Burgers',
    price: 24.0,
    description: 'Wagyu beef patty, triple-cream brie, caramelized shallots, and black truffle aioli on a gilded brioche bun.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPnMW5dTzCZOu7a6PpSjOSlCybHhDHqPeFSGTMzcjnJUv6rBGE21VIhFyzDKEvu-NBMg05nyksq-Lwkw0ossPDtrDTkqTN04smGY-4x3sKpcRpyUE8PrsMcLbrCIjXOpp6V1RwY6ZU5pDEaXNjeWCcBIuvx7PnpR0JM49W-TRK9SoAU_ZaCO_ypjMtuDH3Xf74s8govIaiFKYwFqrhV7YZS2cjgTcc0kGc8goiHp9sWbD-vQoIgo8mIqtFmvkNZUdko_I4t2P0Qbc',
    rating: 4.9,
    reviews: 120,
    prepTime: '15 min',
    badge: 'Chef Special'
  },
  {
    id: '2',
    name: 'Artisanal Pepperoni Pizza',
    category: 'Pizza',
    price: 21.0,
    description: 'Double-fermented sourdough, spicy calabrese, hot honey, and house-made buffalo mozzarella.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkCy0cRdoW0XthbpMq-yFA-zzuU-bFP9jHg2NTv8sGh3EohO-9aYfK7Dl5-I96z6f5kVU08oYYUTuQ5DMNyTeMikuOiPCQhM8gwpUJlG_K-45ftQPkeaBpFchmd-L9eZiWkvUz6VnF4KaJunClruzOJfkpV1gQugcoan1L0cP-BUMK1NLAkC-kH78J4zOIx-RSoJhW2WfCO42O_-CCtqspXCaTOFiIrzdNbVTW7ZO-t5eMPzEMxowDQFvBi5mSgVoZDUadMLBWbuM',
    rating: 4.8,
    reviews: 340,
    prepTime: '12 min',
    badge: 'Popular'
  },

  // Burgers & Steaks
  {
    id: '3',
    name: 'Bourbon BBQ Smoke Burger',
    category: 'Burgers',
    price: 26.0,
    description: 'Double beef patty, maple-cured bacon, crispy tobacco onions, and house bourbon glaze.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB07yMQwR76dh5D0-v3MBWBnL3ssfCTKGyCeBFg6jCV6apKSWuJ7r4QgeWROPdFGBcTEzEMFHYZ5UuXxp7elteDC3l8djSmj-okvh33bDz6Z4pUr-ZyPp-WcmhBQc_VghB9iwogm47jb1eYg71auUezC4tyTwRaFVijmT_pdPMcEO8uGZ_j4CZFfLeo85Wn4F-zjBt4ReFBT5L5nYXZHX8Lt8gU48YRbDZcCZqRWkOJC1sSSSVhq4n3PdpMR7hDae52qOnReftxOEg',
    rating: 4.7,
    reviews: 85,
    prepTime: '18 min'
  },
  {
    id: '4',
    name: 'Spicy Buffalo Wings',
    category: 'Starters',
    price: 18.0,
    description: 'Sous-vide then double-fried wings tossed in aged cayenne sauce. Served with roquefort dip.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbNGfsC8gCsW8lFrJs3yS08HEqpI3QxOqmPTqDuXYiIArhpoLfT2JoIEFFqFD0PD5ANgfPbDlmuQwtg1CGoIy9uEkguffKTxkD00xaEnHp7BMIRKzxABKSsZgWTTQs-UzTYMdpp01BSBCMxUzKhq8lAKrBY6PtVxVp9Vg38jaFFY0VvlSSPvtBi8Dm2BNd2oFg92Swe-F2EIWpCL8LXByIRzzrxTHfJdHN9NvNJsf6gROQQrDf6pMibfjTWtMvwQLXAtTCz2CU9GA',
    rating: 4.6,
    reviews: 1100,
    prepTime: '10 min'
  },
  {
    id: '5',
    name: 'Sea Bass Tartare & Citrus',
    category: 'Starters',
    price: 34.0,
    description: 'Wild sea bass, edible gold leaf, micro-herbs, and ruby grapefruit reduction.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjxo7PTqnkb2ByquvTN4PSJF_aFOMai0e-66m_kY5OcMK4ScTwg9t57oCRYst1rzEc1Neh9Iga_77h8NhDXn967goGSOUgpMHysAY2CIrRlRJ3U6e1itvOO5qradubZrmmoH9PUKg-z1gvg7UrufKkcT9zCRHLBegT0IB6itGigaCDbCHmaqBzpvqf6up6BUoExydS2eQJt_XytyC1J_x5w_EPJit9xmrrqWS2zQa0ONiQUD9kIS7kzrbIZinwkH3ap4F35onxV2Y',
    rating: 4.9,
    reviews: 420,
    prepTime: '12 min',
    badge: 'Signature'
  },

  // Pizza & Pasta
  {
    id: '6',
    name: 'Truffle & Wild Mushroom Pasta',
    category: 'Pasta',
    price: 29.0,
    description: 'Handcrafted tagliatelle, black summer truffle, chanterelles, and 36-month Parmigiano Reggiano.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIb_Uo23kTJpPcIMURUZmNrGyhHrLA_AkoSspLoXESUeC2-QgV1mYlBTlKppD6cilp8R3RB8mMxOlfndzPvfhL7xITN5VCYtU4icw39sQMq5p_re4-y6CvplHpd7U_bLH6AjvF_5pZvgdYCleJD2VLWxbX5KPeDhLZfgMDH3IkQEynd-x99MRLYQ26FI1narcNVF049Tj7tSmABL55PD8_mGdAhJKp7Bej6eAaI1hLCiWlXN50imkpkwNu1W9aTVnGekbswD9zQY',
    rating: 4.9,
    reviews: 510,
    prepTime: '15 min',
    isVeg: true
  },
  {
    id: '7',
    name: 'Wagyu Ribeye Steak (300g)',
    category: 'Steaks',
    price: 65.0,
    description: 'A5 Japanese Wagyu steak, bone marrow butter, roasted garlic head, and smoked sea salt flakes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ahzV-qIr22Is_b8mUE8ZmFoYSg6UIiCOEuDGEcKRIjnUPd0mPnpt4ygBsi_JGlLMaQkItlCuNo6k36T1YYd4uaU1zoVRM3qrereIuSuADm5MQUgTpS600hMNOiLD9E6waygSgdOF2hRatW5Hh48IzFShpVgUp5ABu79zo68vOQWKv1Wy949N0PUp9CAsUJg9hiAPXAjWLbS1vB6pUebHkwNWFh_Y0BJP4kaMxcSGr1xeu1AsmF41ttCSrPao62HFMy6ihibr3Vg',
    rating: 5.0,
    reviews: 290,
    prepTime: '20 min',
    badge: 'Luxury'
  },

  // Desserts & Beverages
  {
    id: '8',
    name: 'Deconstructed Chocolate Sphere',
    category: 'Desserts',
    price: 28.0,
    description: 'Valrhona 70% dark chocolate, gold leaf finish, warm hazelnut praline pour over vanilla bean gelato.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIb_Uo23kTJpPcIMURUZmNrGyhHrLA_AkoSspLoXESUeC2-QgV1mYlBTlKppD6cilp8R3RB8mMxOlfndzPvfhL7xITN5VCYtU4icw39sQMq5p_re4-y6CvplHpd7U_bLH6AjvF_5pZvgdYCleJD2VLWxbX5KPeDhLZfgMDH3IkQEynd-x99MRLYQ26FI1narcNVF049Tj7tSmABL55PD8_mGdAhJKp7Bej6eAaI1hLCiWlXN50imkpkwNu1W9aTVnGekbswD9zQY',
    rating: 4.9,
    reviews: 640,
    prepTime: '10 min',
    badge: 'Popular',
    isVeg: true
  },
  {
    id: '9',
    name: 'Château Margaux 2015 Premier Cru',
    category: 'Beverages',
    price: 185.0,
    description: 'Sommelier selected premier grand cru classé, decanted and temperature-controlled.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ2SwfE-L4ENpw0vIUBXHTsJ5WtR_WchM-HleBOHJAKcVE2EBoTYxscGxwzwDphMvAL9Pm3bTQC8jItpGg-PcEX1N9MSqhU2utK5AyJayd_q0O_cOC9f6IAl0iRpUqomC_fV9pMHcOmnPnX0Sou3nleMjzMJkmyjHFb6knQH015fgsy3GnbPME85GyiNwRQCGkXjkwlICjSCGB3pd2zxXB7PMtsokmlyiVv3KycxRD8J9mx0S1RZFZd-YIMe1fwVXt9dw_1vBgTKw',
    rating: 5.0,
    reviews: 180,
    prepTime: '5 min'
  }
];

const CATEGORY_TABS = [
  'Popular',
  'Veg',
  'Non-Veg',
  'Starters',
  'Burgers',
  'Pizza',
  'Pasta',
  'Steaks',
  'Desserts',
  'Beverages'
];

interface MenuViewProps {
  onBackToWebsite: () => void;
  onBookTable: () => void;
  onToast: (msg: string) => void;
}

export const MenuView = ({
  onBackToWebsite,
  onBookTable,
  onToast
}: MenuViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Popular');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('popular');

  // Filter items based on search and category pill
  const filteredItems = ALL_MENU_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'Popular') return true;
    if (selectedFilter === 'Veg') return item.isVeg === true;
    if (selectedFilter === 'Non-Veg') return item.isVeg !== true;
    return item.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartPrice = ALL_MENU_ITEMS.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onToast(`Order confirmed! Total $${totalCartPrice.toFixed(2)}. Preparing for delivery.`);
    setCart({});
    setIsCheckoutOpen(false);
  };

  // Scrollspy observer for sidebar category links
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['popular', 'burgers', 'starters', 'pizza', 'pasta', 'steaks', 'desserts', 'beverages'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header
        currentPage="menu"
        onNavigateLanding={onBackToWebsite}
        onNavigateMenu={() => {}}
        onNavigateReservations={onBookTable}
        onToast={onToast}
      />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center pt-28 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Hero Section */}
        <div className="mb-10 bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label-sm text-primary uppercase tracking-widest">Fine Dining & Takeaway</span>
              <h1 className="font-display-lg text-4xl md:text-5xl font-semibold text-on-surface mb-3 mt-1">Lumière</h1>
              <div className="flex flex-wrap items-center gap-4 text-secondary font-body-md">
                <div className="flex items-center gap-1 text-on-surface font-bold">
                  <span className="material-symbols-outlined text-primary text-xl filled">star</span>
                  <span>4.9</span>
                  <span className="text-secondary font-normal">(2.4k+ Reviews)</span>
                </div>
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full"></span>
                <span>Modern French / American Fusion</span>
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full"></span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span>25-35 min</span>
                </div>
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full"></span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary">shopping_bag</span>
                  <span>Pickup Available</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onToast('Menu link copied to clipboard!')}
                className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant/40 bg-surface rounded-xl hover:bg-surface-container-high transition-all text-on-surface font-body-md"
              >
                <span className="material-symbols-outlined">share</span>
                <span>Share</span>
              </button>
              <button
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  onToast(isFavorite ? 'Removed from favorites' : 'Added to favorites');
                }}
                className={`flex items-center gap-2 px-5 py-2.5 border rounded-xl transition-all font-body-md ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'border-outline-variant/40 bg-surface hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className={`material-symbols-outlined ${isFavorite ? 'filled text-rose-600' : ''}`}>favorite</span>
                <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-md py-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative w-full lg:max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search for dishes, drinks, or ingredients..."
                className="w-full pl-12 pr-4 py-3.5 bg-surface border border-outline-variant/30 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface">
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 w-full hide-scrollbar">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-5 py-2.5 rounded-full font-body-md text-sm whitespace-nowrap transition-all active:scale-95 ${
                    selectedFilter === tab
                      ? 'bg-primary text-on-primary font-bold shadow-md'
                      : 'bg-surface border border-outline-variant/30 text-secondary hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-3 lg:col-span-2 hidden md:block">
            <div className="sticky top-44 space-y-1.5 bg-surface p-3 rounded-2xl border border-outline-variant/20 shadow-sm">
              <h3 className="font-label-sm text-secondary uppercase tracking-widest px-3 mb-2">Categories</h3>
              {[
                { id: 'popular', label: 'Popular', icon: 'star' },
                { id: 'burgers', label: 'Burgers', icon: 'lunch_dining' },
                { id: 'starters', label: 'Starters', icon: 'restaurant' },
                { id: 'pizza', label: 'Pizza', icon: 'local_pizza' },
                { id: 'pasta', label: 'Pasta', icon: 'dinner_dining' },
                { id: 'steaks', label: 'Steaks', icon: 'flatware' },
                { id: 'desserts', label: 'Desserts', icon: 'icecream' },
                { id: 'beverages', label: 'Beverages', icon: 'local_bar' }
              ].map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all font-body-md ${
                    activeSection === cat.id
                      ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary'
                      : 'text-secondary hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Menu Items Grid */}
          <div className="md:col-span-9 lg:col-span-10 space-y-12">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-surface rounded-2xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-4xl text-secondary mb-2">search_off</span>
                <h3 className="font-headline-md font-semibold text-on-surface">No dishes found</h3>
                <p className="font-body-md text-secondary mt-1">Try adjusting your search query or filter selection.</p>
              </div>
            ) : (
              <>
                {/* Popular Section */}
                <section id="popular">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-headline-md text-2xl font-bold text-on-surface">Popular Choices</h2>
                    <span className="text-secondary font-body-md text-sm">Top rated by diners</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredItems
                      .filter((i) => i.badge || i.rating >= 4.8)
                      .slice(0, 4)
                      .map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          qty={cart[item.id] || 0}
                          onUpdateQty={(delta) => handleUpdateQty(item.id, delta)}
                        />
                      ))}
                  </div>
                </section>

                {/* Burgers Section */}
                <section id="burgers">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-headline-md text-2xl font-bold text-on-surface">Burgers & Steaks</h2>
                    <a href="#steaks" className="text-primary font-bold text-sm hover:underline">View Steaks</a>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredItems
                      .filter((i) => i.category === 'Burgers' || i.category === 'Steaks')
                      .map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          qty={cart[item.id] || 0}
                          onUpdateQty={(delta) => handleUpdateQty(item.id, delta)}
                        />
                      ))}
                  </div>
                </section>

                {/* Starters & Pizza Section */}
                <section id="starters">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-headline-md text-2xl font-bold text-on-surface">Starters & Pizza</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredItems
                      .filter((i) => i.category === 'Starters' || i.category === 'Pizza' || i.category === 'Pasta')
                      .map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          qty={cart[item.id] || 0}
                          onUpdateQty={(delta) => handleUpdateQty(item.id, delta)}
                        />
                      ))}
                  </div>
                </section>

                {/* Desserts & Beverages Section */}
                <section id="desserts">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-headline-md text-2xl font-bold text-on-surface">Desserts & Fine Beverages</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredItems
                      .filter((i) => i.category === 'Desserts' || i.category === 'Beverages')
                      .map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          qty={cart[item.id] || 0}
                          onUpdateQty={(delta) => handleUpdateQty(item.id, delta)}
                        />
                      ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Floating Bottom Cart Summary Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto z-50 animate-fadeIn">
          <div className="bg-inverse-surface text-inverse-on-surface p-4 rounded-2xl shadow-2xl flex items-center gap-6 md:min-w-[360px] border border-white/10">
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] uppercase opacity-70 tracking-widest">Selected Gourmet Order</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-md text-xl font-bold">{totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'}</span>
                <span className="opacity-50">•</span>
                <span className="font-headline-md text-xl font-bold text-primary-fixed-dim">${totalCartPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="ml-auto bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"
            >
              <span>Checkout</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Checkout Drawer Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20 flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 bg-surface-container flex items-center justify-between border-b border-outline-variant/20">
              <div>
                <span className="font-label-sm text-primary uppercase tracking-widest">Order Summary</span>
                <h3 className="font-headline-md text-on-surface font-semibold">Confirm Lumière Delivery</h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Order Items Breakdown */}
              <div className="space-y-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                <h4 className="font-body-md font-bold text-on-surface border-b border-outline-variant/20 pb-2">Items</h4>
                {ALL_MENU_ITEMS.filter((i) => cart[i.id]).map((item) => (
                  <div key={item.id} className="flex justify-between items-center font-body-md text-sm">
                    <div>
                      <span className="font-bold text-primary mr-2">{cart[item.id]}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold text-on-surface">${(item.price * cart[item.id]).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-outline-variant/20 pt-2 flex justify-between font-body-md font-bold text-on-surface">
                  <span>Subtotal</span>
                  <span>${totalCartPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="space-y-4">
                <div>
                  <label className="block font-body-md font-medium text-on-surface mb-1">Delivery Address</label>
                  <input
                    type="text"
                    defaultValue="14 Mayfair Square, London, W1J 8AJ"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body-md font-medium text-on-surface mb-1">Payment Method</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none focus:border-primary">
                    <option>Apple Pay (••• 9421)</option>
                    <option>Visa (••• 4022)</option>
                    <option>American Express Centurion</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-outline-variant/20">
                <div>
                  <div className="text-xs text-secondary">Total Payable</div>
                  <div className="font-headline-md font-bold text-primary">${totalCartPrice.toFixed(2)}</div>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-primary text-on-primary font-body-md font-bold hover:bg-primary-container shadow-md transition-all active:scale-95"
                >
                  Place Order Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer
        onNavigateLanding={onBackToWebsite}
        onNavigateMenu={() => {}}
        onNavigateReservations={onBookTable}
        onToast={onToast}
      />
    </div>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  qty: number;
  onUpdateQty: (delta: number) => void;
}

const MenuItemCard = ({ item, qty, onUpdateQty }: MenuItemCardProps) => {
  return (
    <div className="bg-surface p-5 rounded-2xl border border-outline-variant/30 flex gap-5 transition-all duration-300 hover:shadow-lg group hover:-translate-y-1">
      <div className="relative w-32 h-32 md:w-36 md:h-36 shrink-0 overflow-hidden rounded-xl border border-outline-variant/20">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={item.image}
          alt={item.name}
        />
        {item.badge && (
          <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-primary text-on-primary text-[10px] font-bold uppercase rounded-full shadow">
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="font-headline-md text-lg font-bold text-on-surface">{item.name}</h3>
            <span className="font-headline-md text-primary font-bold">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-secondary font-body-md text-sm line-clamp-2 mb-3">{item.description}</p>
          <div className="flex items-center gap-3 text-xs text-secondary">
            <div className="flex items-center gap-1 font-semibold text-on-surface">
              <span className="material-symbols-outlined text-sm text-primary filled">star</span>
              <span>{item.rating} ({item.reviews})</span>
            </div>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>{item.prepTime}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          {qty > 0 ? (
            <div className="flex items-center bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm">
              <button onClick={() => onUpdateQty(-1)} className="p-2 hover:bg-outline-variant/20 transition-colors">
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="px-4 font-bold min-w-[36px] text-center text-sm">{qty}</span>
              <button onClick={() => onUpdateQty(1)} className="p-2 hover:bg-outline-variant/20 transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onUpdateQty(1)}
              className="px-6 py-2 bg-on-surface text-on-primary rounded-xl font-bold hover:bg-primary transition-all active:scale-95 shadow-sm text-sm"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

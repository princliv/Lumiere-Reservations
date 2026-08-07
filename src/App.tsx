import { useState, useEffect } from 'react';
import { ReservationModal } from './components/ReservationModal';
import { OrderOnlineModal } from './components/OrderOnlineModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { ChefStoryModal } from './components/ChefStoryModal';
import { Toast } from './components/Toast';
import { MenuView } from './components/MenuView';
import { ReservationView } from './components/ReservationView';
import { ScrollToTop } from './components/ScrollToTop';

interface GalleryItem {
  src: string;
  title: string;
  caption: string;
  colSpan: string;
  rowSpan?: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ahzV-qIr22Is_b8mUE8ZmFoYSg6UIiCOEuDGEcKRIjnUPd0mPnpt4ygBsi_JGlLMaQkItlCuNo6k36T1YYd4uaU1zoVRM3qrereIuSuADm5MQUgTpS600hMNOiLD9E6waygSgdOF2hRatW5Hh48IzFShpVgUp5ABu79zo68vOQWKv1Wy949N0PUp9CAsUJg9hiAPXAjWLbS1vB6pUebHkwNWFh_Y0BJP4kaMxcSGr1xeu1AsmF41ttCSrPao62HFMy6ihibr3Vg',
    title: 'The Vault Room',
    caption: 'Private dining vault featuring mahogany table and hand-blown amber chandelier.',
    colSpan: 'col-span-4 md:col-span-6'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ2SwfE-L4ENpw0vIUBXHTsJ5WtR_WchM-HleBOHJAKcVE2EBoTYxscGxwzwDphMvAL9Pm3bTQC8jItpGg-PcEX1N9MSqhU2utK5AyJayd_q0O_cOC9f6IAl0iRpUqomC_fV9pMHcOmnPnX0Sou3nleMjzMJkmyjHFb6knQH015fgsy3GnbPME85GyiNwRQCGkXjkwlICjSCGB3pd2zxXB7PMtsokmlyiVv3KycxRD8J9mx0S1RZFZd-YIMe1fwVXt9dw_1vBgTKw',
    title: 'Sommelier Pouring',
    caption: 'Vintage premier grand cru classé poured into thin-stemmed crystal.',
    colSpan: 'col-span-2 md:col-span-3'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIb_Uo23kTJpPcIMURUZmNrGyhHrLA_AkoSspLoXESUeC2-QgV1mYlBTlKppD6cilp8R3RB8mMxOlfndzPvfhL7xITN5VCYtU4icw39sQMq5p_re4-y6CvplHpd7U_bLH6AjvF_5pZvgdYCleJD2VLWxbX5KPeDhLZfgMDH3IkQEynd-x99MRLYQ26FI1narcNVF049Tj7tSmABL55PD8_mGdAhJKp7Bej6eAaI1hLCiWlXN50imkpkwNu1W9aTVnGekbswD9zQY',
    title: 'Artisanal Dessert',
    caption: 'Deconstructed chocolate sphere with gold leaf on dark slate plate.',
    colSpan: 'col-span-2 md:col-span-3'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKPss8TPGgMf-Y8MWpZq7aApZrknob0u2vlymDMLhcYuMdNgwZXhjclHHA6gkgzQufxVduxJearT4yt3PYcPW6_kCoMg0q7Xadloi5XfMwIWLeuDMtGFvIs6hX8GkP3c0chRqFDlhm8yG_KEJzVuunyyLbzxvSI0hXAkImaPxly_M4lTDgM253D1Eo_MELJl8o7Nj0GsJZ9IxdvzVSfvVXJEAaMoUvfYR0yU_-XkvTK57-T2OdVgwsdYI7iC0mFynmdmjkuKj37EE',
    title: 'Kitchen Craftsmanship',
    caption: 'Precision garnish placement in our surgical kitchen environment.',
    colSpan: 'col-span-2 md:col-span-3'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAwGaZwXFPwj_bW2Q-244iR4HQv3BBrLRimTlG7Zx5PXvy5wVqznhfUlSVoHqhSyDjw3sgTWooyhxQlzHVkoZPXjNdHNYUz9LW5-j7EmaI-loqCuwCt0TDoFqDvdCdYKB33SIzOS5pC-4ioszmueKo3kQ6kJS7D9865nk_NxyboX_xzvl7K0jI8beUHKgkl2cUpl7fp-h1E-KgvyBznyQiMOD9UA367j8BAHJgmODDWVVestXclKfTMumQuIOpXgt0-KHRc3JAFfM',
    title: 'Main Dining Room',
    caption: 'Panoramic golden hour lighting across soaring ceilings and crisp linens.',
    colSpan: 'col-span-6 md:col-span-9'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'menu' | 'reservations'>('landing');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isChefStoryOpen, setIsChefStoryOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStickyShadowed, setIsStickyShadowed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsStickyShadowed(true);
      } else {
        setIsStickyShadowed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  if (currentPage === 'reservations') {
    return (
      <>
        <ReservationView
          onNavigateLanding={() => setCurrentPage('landing')}
          onNavigateMenu={() => setCurrentPage('menu')}
          onToast={triggerToast}
        />
        <ScrollToTop />
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </>
    );
  }

  if (currentPage === 'menu') {
    return (
      <>
        <MenuView
          onBackToWebsite={() => setCurrentPage('landing')}
          onBookTable={() => setCurrentPage('reservations')}
          onOurStory={() => setIsChefStoryOpen(true)}
          onToast={triggerToast}
        />

        <ReservationModal
          isOpen={isReserveModalOpen}
          onClose={() => setIsReserveModalOpen(false)}
          onSuccess={triggerToast}
        />

        <ChefStoryModal
          isOpen={isChefStoryOpen}
          onClose={() => setIsChefStoryOpen(false)}
        />

        <ScrollToTop />

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      {/* Top Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-outline-variant/10 transition-all">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
          <div className="font-display-lg text-headline-md tracking-tighter font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
            Lumière Reservations
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a className="font-body-md text-primary font-bold border-b-2 border-primary py-1" href="#discover">
              Discover
            </a>
            <button
              onClick={() => setCurrentPage('reservations')}
              className="font-body-md text-secondary hover:text-on-surface transition-colors py-1 hover:text-primary font-medium"
            >
              Reservations
            </button>
            <button
              onClick={() => setCurrentPage('menu')}
              className="font-body-md text-secondary hover:text-on-surface transition-colors py-1 hover:text-primary font-medium"
            >
              Menu
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => triggerToast('Signed out of guest session')}
              className="hidden sm:block font-body-md text-secondary hover:text-on-surface transition-colors"
            >
              Sign Out
            </button>
            <div
              className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20 shadow-sm cursor-pointer"
              onClick={() => triggerToast('Profile preferences loaded')}
            >
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7pRDjvZZnOxAd6pNZUuek8TyUBkAZRBuxC-npyROZRfOdwhAu1I-oYWMmDBXJyNILw50ICBAaDBooBbhtV9DwMil3MhtUB5QqQ5-fVFllIlDA5lr390PM5f51VJ8cmtGSTJB0T3Q6cBN4oJUUKPV4vqiT_EvK1v_Bc-mbek60ngPLhpQYRb7zBHb7chjPtjKDsAOgvl9tDnb8pKvupWbQnoqAOUdRNuJzOEb6hBAeM8d8ruYxYOywfqW0Z_eRC_BuX7uFzNFS45A"
                alt="Luxury Dining Guest Profile"
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface"
            >
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-outline-variant/20 px-6 py-4 space-y-3 animate-fadeIn">
            <a href="#discover" className="block font-body-md font-semibold text-primary" onClick={() => setIsMobileMenuOpen(false)}>Discover</a>
            <button onClick={() => { setCurrentPage('reservations'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-body-md text-secondary font-semibold text-primary">Reservations Page</button>
            <button onClick={() => { setCurrentPage('menu'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-body-md text-secondary font-semibold text-primary">Menu Page</button>
            <button onClick={() => { triggerToast('Signed out'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-body-md text-secondary">Sign Out</button>
          </div>
        )}
      </header>

      <main className="pt-0 flex-1">
        {/* Hero Section */}
        <section id="discover" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/45 z-10"></div>
            <div
              className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-1000"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQbyYUDRt6Ie5sV8x34REUiRO9cxq65xZQidv0ToYVkQhSkqTUhN1V8UhO9WW-PoCz9WNOvazyBRZlgnJLmMdHLbj2VxmxZziIK3bdJCegH6dRc5gFthM3376iukAp0V3CPTrFLp4PbBE6UIQsBPk1Jq8AnESBdDkdA3s4A3s_1Y-m_26zcDI8e8-6dEEqoYx04LEWExavtkPbdqNXt_PmuZgrTFNrE1_skeUTqCvub7xleE072eCSUTlWRgEwBKCwPzo23h2zGEk")`
              }}
            ></div>
          </div>

          <div className="relative z-20 text-center px-margin-mobile fade-in max-w-4xl">
            <h1 className="font-display-lg text-white mb-4 tracking-tighter font-semibold drop-shadow-md">
              Lumière
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-3 text-white/90 mb-6 font-body-md">
              <span>Modern French</span>
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              <span className="flex items-center">
                <span className="material-symbols-outlined text-primary-fixed-dim mr-1 filled">star</span>
                4.9 (2.4k Reviews)
              </span>
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              <span>$$$$</span>
            </div>
            <p className="font-body-lg text-white/85 max-w-2xl mx-auto drop-shadow">
              Experience invisible excellence at our flagship dining room in Mayfair.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setCurrentPage('reservations')}
                className="px-8 py-3.5 rounded-xl bg-primary text-on-primary font-body-md font-bold hover:bg-primary-container shadow-xl transition-all active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined">table_restaurant</span>
                Reserve a Table
              </button>
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-8 py-3.5 rounded-xl bg-surface/20 text-white font-body-md font-bold hover:bg-surface/30 backdrop-blur-md shadow-xl transition-all active:scale-95 flex items-center gap-2 border border-white/30"
              >
                <span className="material-symbols-outlined">restaurant_menu</span>
                View Menu
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/70">
            <span className="material-symbols-outlined text-3xl">expand_more</span>
          </div>
        </section>

        {/* Sticky Action Bar */}
        <div className={`sticky top-[73px] z-40 bg-surface border-b border-outline-variant/20 transition-all duration-300 ${isStickyShadowed ? 'shadow-lg bg-surface/95 backdrop-blur-md' : 'shadow-sm'}`}>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-secondary">
              <span className="material-symbols-outlined text-primary mr-2">location_on</span>
              <span className="font-body-md font-semibold text-on-surface">Mayfair, London</span>
              <span className="mx-3 text-outline-variant">•</span>
              <span className="text-sm text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                Open for Dinner
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={() => setCurrentPage('menu')}
                className="flex-1 md:flex-none px-8 py-3 rounded-xl border border-outline text-on-surface font-body-md font-medium hover:bg-surface-container-low transition-all"
              >
                Order Online
              </button>
              <button
                onClick={() => setCurrentPage('reservations')}
                className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-primary text-on-primary font-body-md font-bold hover:bg-primary-container transition-all active:scale-95 shadow-md"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>

        {/* Key Info Cards Grid */}
        <section className="py-section-gap bg-surface-container">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Amenities Card */}
              <div className="bg-surface rounded-xl p-8 shadow-sm border border-outline-variant/10 hover:shadow-md transition-all">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">concierge</span>
                  <h3 className="font-headline-md font-semibold">Amenities</h3>
                </div>
                <ul className="space-y-4 font-body-md text-secondary">
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Valet Parking</span> <span className="text-on-surface font-medium">Available</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Private Dining</span> <span className="text-on-surface font-medium">Vault Room</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Wheelchair Access</span> <span className="text-on-surface font-medium">Fully Accessible</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wi-Fi</span> <span className="text-on-surface font-medium">Complimentary</span>
                  </li>
                </ul>
              </div>

              {/* Policy & Style Card */}
              <div className="bg-surface rounded-xl p-8 shadow-sm border border-outline-variant/10 hover:shadow-md transition-all">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">info</span>
                  <h3 className="font-headline-md font-semibold">The Details</h3>
                </div>
                <ul className="space-y-4 font-body-md text-secondary">
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Dress Code</span> <span className="text-on-surface font-medium">Smart Casual</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Dining Style</span> <span className="text-on-surface font-medium">Fine Dining</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Payment</span> <span className="text-on-surface font-medium">Visa, MC, AMEX</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Corkage</span> <span className="text-on-surface font-medium">£50 per bottle</span>
                  </li>
                </ul>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-surface rounded-xl p-8 shadow-sm border border-outline-variant/10 hover:shadow-md transition-all">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                  <h3 className="font-headline-md font-semibold">Opening Hours</h3>
                </div>
                <ul className="space-y-4 font-body-md text-secondary">
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Mon - Thu</span> <span className="text-on-surface font-medium">18:00 - 23:00</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Fri - Sat</span> <span className="text-on-surface font-medium">12:00 - 00:00</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span>Sunday</span> <span className="text-on-surface font-medium">12:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Status</span> <span className="text-primary font-bold">Open for Dinner</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="font-label-sm text-primary tracking-widest uppercase">The Philosophy</span>
              <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface leading-tight font-semibold">
                A sanctuary of light and culinary precision.
              </h2>
              <p className="font-body-lg text-secondary leading-relaxed">
                At Lumière, we believe the finest dining experiences are those where the service is felt but not seen. Every dish is a dialogue between tradition and innovation, meticulously crafted to showcase the purest essence of seasonal ingredients.
              </p>

              <div className="flex items-center space-x-4 pt-4 border-l-2 border-primary/40 pl-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">restaurant</span>
                </div>
                <p className="font-body-md font-medium italic text-on-surface">
                  "The intersection of high-end hospitality and technical precision."
                </p>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => setIsChefStoryOpen(true)}>
              <div className="absolute -inset-4 bg-primary-fixed opacity-10 rounded-xl group-hover:opacity-25 transition-opacity"></div>
              <div className="relative overflow-hidden rounded-xl h-[480px] shadow-2xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjxo7PTqnkb2ByquvTN4PSJF_aFOMai0e-66m_kY5OcMK4ScTwg9t57oCRYst1rzEc1Neh9Iga_77h8NhDXn967goGSOUgpMHysAY2CIrRlRJ3U6e1itvOO5qradubZrmmoH9PUKg-z1gvg7UrufKkcT9zCRHLBegT0IB6itGigaCDbCHmaqBzpvqf6up6BUoExydS2eQJt_XytyC1J_x5w_EPJit9xmrrqWS2zQa0ONiQUD9kIS7kzrbIZinwkH3ap4F35onxV2Y"
                  alt="Sea Bass Tartare with Citrus Gel"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl text-white flex justify-between items-center">
                  <div>
                    <div className="font-body-md font-semibold">Sea Bass Tartare</div>
                    <div className="text-xs text-white/70">Citrus gel, edible gold leaf, micro-herbs</div>
                  </div>
                  <span className="material-symbols-outlined">zoom_in</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Lumière Gallery (Bento Layout) */}
        <section className="py-section-gap bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-12 text-center">
              <span className="font-label-sm text-primary uppercase tracking-widest">Visual Atmosphere</span>
              <h2 className="font-headline-md text-2xl md:text-3xl font-semibold text-on-surface mt-1">The Lumière Gallery</h2>
              <p className="font-body-md text-secondary mt-2">Captured moments of invisible excellence</p>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-12 gap-4 auto-rows-[250px]">
              {GALLERY_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`${img.colSpan} rounded-xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all`}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={img.src}
                    alt={img.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                    <h4 className="font-headline-md text-lg font-bold">{img.title}</h4>
                    <p className="font-body-md text-xs text-white/80 line-clamp-1">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chef Story Section */}
        <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/3 order-2 md:order-1">
              <div className="rounded-xl overflow-hidden shadow-2xl relative group cursor-pointer" onClick={() => setIsChefStoryOpen(true)}>
                <img
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCERWltkKVtse3b_wW36xjpnZH9THUDFygROWcQspdLRJ5HTiu6Q4NBDuP8s0kk_E5oXJtloZBVvgdvk9BSW6eZHPM0JIm2MWQi0JMbTSKmUFPHN4RR69klsdUG0fJLlQmNJl_wd_GzrcIxSvK19U9fBER_3KQL7fA0zIGK-dHc3w62l7nXnZm1R38Mognk_2XXCPih-BC_JYziLjhqu3dAC5c7svqIrWt6KOHKHronMZSMIgEaSepyrh4D-yb3FfW83BWYd5-39AA"
                  alt="Chef Marcelle Vignon"
                />
                <div className="absolute bottom-4 right-4 bg-primary text-on-primary p-2 rounded-full shadow-lg">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 order-1 md:order-2 space-y-6">
              <span className="font-label-sm text-tertiary tracking-widest uppercase">The Visionary</span>
              <h2 className="font-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
                Chef Marcelle Vignon
              </h2>
              <p className="font-body-lg text-secondary leading-relaxed italic border-l-2 border-tertiary/40 pl-4">
                "Culinary art is not found in complexity, but in the radical simplification of a flavor until its soul is revealed. At Lumière, we strip away the noise to let the ingredient speak."
              </p>
              <p className="font-body-md text-on-surface-variant">
                With three Michelin stars and a career spanning the finest kitchens of Lyon and Paris, Chef Vignon brings a technical rigor to Mayfair that is unmatched. Her vision for Lumière was to create a space where diners could lose track of time, anchored only by the rhythm of the season.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setIsChefStoryOpen(true)}
                  className="font-body-md text-primary font-bold flex items-center group hover:underline"
                >
                  Read the Full Story
                  <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant/20 pt-16 pb-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h2 className="font-display-lg-mobile text-headline-md tracking-tighter font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                Lumière
              </h2>
              <p className="font-body-md text-secondary max-w-sm">
                Experience the invisible excellence of modern French cuisine in the heart of Mayfair. Part of the Haute-Cuisine Group.
              </p>
            </div>

            <div>
              <h4 className="font-label-sm text-on-surface uppercase mb-6 font-semibold">Navigation</h4>
              <ul className="space-y-4 font-body-md text-secondary">
                <li><a className="hover:text-primary transition-colors" href="#discover">Experience</a></li>
                <li><button className="hover:text-primary transition-colors" onClick={() => setCurrentPage('menu')}>Menu</button></li>
                <li><button className="hover:text-primary transition-colors" onClick={() => setCurrentPage('reservations')}>Reservations</button></li>
                <li><button className="hover:text-primary transition-colors" onClick={() => setCurrentPage('reservations')}>Private Dining</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-label-sm text-on-surface uppercase mb-6 font-semibold">Contact</h4>
              <ul className="space-y-4 font-body-md text-secondary">
                <li>12 Berkeley Square, Mayfair, London</li>
                <li>+44 (0) 20 7123 4567</li>
                <li>hello@lumiere-dining.com</li>
                <li className="flex space-x-4 pt-2">
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary" onClick={() => triggerToast('Share link copied')}>share</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary" onClick={() => triggerToast('Instagram page opened')}>camera</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/10 text-secondary font-label-sm gap-4">
            <div className="flex items-center gap-2 text-secondary font-label-sm">
              <span>POWERED BY</span>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbsZIxMTMGTD3TOfdIZm391OfjJ-oJrf2h3HKZ3BckU_Pk9Xb4te2EC5d-YrvHHrXPiHQdB2_6OjGs1OAq-biSiEhxd6BuMJe3ffJKTjgOYY1pIqwUvbEXpqnX3gPsW1OXg5_s2RkBbp2RKyY5FqSqzv_g6By6qkOFUzb9_zB3EnRZsuf8N4hEDjKMWW67H_-YOCT4OhJKBxk07UzB_cmcBbfPBTvT7TppRA0gkxSOHdV274CcTZrNaygCHjJIlLG97a0Vv8v0lQs"
                alt="Astryd Logo"
                className="h-6 w-auto"
              />
            </div>
            <div className="flex space-x-6">
              <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-on-surface transition-colors" href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        onSuccess={triggerToast}
      />

      <OrderOnlineModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        onSuccess={triggerToast}
      />

      <GalleryLightbox
        isOpen={lightboxIndex !== null}
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex || 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      <ChefStoryModal
        isOpen={isChefStoryOpen}
        onClose={() => setIsChefStoryOpen(false)}
      />

      <ScrollToTop />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default App;

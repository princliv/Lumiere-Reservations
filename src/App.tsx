import { useState, useEffect } from 'react';
import { ReservationModal } from './components/ReservationModal';
import { OrderOnlineModal } from './components/OrderOnlineModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { ChefStoryModal } from './components/ChefStoryModal';
import { Toast } from './components/Toast';
import { MenuView } from './components/MenuView';
import { ReservationView } from './components/ReservationView';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

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
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans antialiased">
      <Header
        currentPage="landing"
        onNavigateLanding={() => setCurrentPage('landing')}
        onNavigateMenu={() => setCurrentPage('menu')}
        onNavigateReservations={() => setCurrentPage('reservations')}
        onToast={triggerToast}
      />

      <main className="pt-0 flex-1">
        {/* Hero Section */}
        <section id="discover" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div
              className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-1000"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQbyYUDRt6Ie5sV8x34REUiRO9cxq65xZQidv0ToYVkQhSkqTUhN1V8UhO9WW-PoCz9WNOvazyBRZlgnJLmMdHLbj2VxmxZziIK3bdJCegH6dRc5gFthM3376iukAp0V3CPTrFLp4PbBE6UIQsBPk1Jq8AnESBdDkdA3s4A3s_1Y-m_26zcDI8e8-6dEEqoYx04LEWExavtkPbdqNXt_PmuZgrTFNrE1_skeUTqCvub7xleE072eCSUTlWRgEwBKCwPzo23h2zGEk")`
              }}
            ></div>
          </div>

          <div className="relative z-20 text-center px-margin-mobile fade-in max-w-4xl pt-16">
            <span className="font-label-sm text-primary-fixed-dim uppercase tracking-[0.25em] mb-3 inline-block font-semibold">
              Mayfair, London
            </span>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-white mb-5 tracking-tight font-normal drop-shadow-lg">
              Lumière
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-3 text-white/90 mb-8 font-sans text-sm md:text-base font-medium">
              <span>Modern French</span>
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-fixed-dim text-lg filled">star</span>
                <span>4.9 (2.4k Reviews)</span>
              </span>
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              <span className="tracking-widest">££££</span>
            </div>
            <p className="font-sans text-base md:text-lg text-white/85 max-w-2xl mx-auto drop-shadow leading-relaxed font-light mb-10">
              Experience invisible excellence at our flagship dining room in Mayfair.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={() => setCurrentPage('reservations')}
                className="px-8 py-3.5 rounded-xl bg-primary text-on-primary font-sans text-sm font-semibold hover:bg-primary-container shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5"
              >
                <span className="material-symbols-outlined text-xl">table_restaurant</span>
                <span>Reserve a Table</span>
              </button>
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-8 py-3.5 rounded-xl bg-surface/20 text-white font-sans text-sm font-semibold hover:bg-surface/30 backdrop-blur-md shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5 border border-white/30"
              >
                <span className="material-symbols-outlined text-xl">restaurant_menu</span>
                <span>View Menu</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/60">
            <span className="material-symbols-outlined text-3xl">expand_more</span>
          </div>
        </section>

        {/* Sticky Action Bar */}
        <div className={`sticky top-[73px] z-40 bg-[#241F17] border-b border-[#C5A059]/30 text-[#E5D4B3] transition-all duration-300 ${isStickyShadowed ? 'shadow-2xl bg-[#241F17]/95 backdrop-blur-md' : 'shadow-md'}`}>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-[#D3C4AF]">
              <span className="material-symbols-outlined text-[#C5A059] mr-2 text-xl">location_on</span>
              <span className="font-sans text-sm font-semibold text-white">Mayfair, London</span>
              <span className="mx-3 text-[#C5A059]/40">•</span>
              <span className="text-xs text-green-300 bg-green-950/70 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 border border-green-700/40">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>Open for Dinner</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={() => setCurrentPage('menu')}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-[#C5A059]/40 text-[#E5D4B3] font-sans text-sm font-medium hover:bg-[#C5A059]/20 hover:text-white transition-all"
              >
                Order Online
              </button>
              <button
                onClick={() => setCurrentPage('reservations')}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#C5A059] text-[#1E1A14] font-sans text-sm font-bold hover:bg-[#d8b063] transition-all active:scale-95 shadow-lg"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>

        {/* Key Info Cards Grid - Section 1 (Color A: #F4EFE6) */}
        <section className="py-section-gap bg-[#F4EFE6] w-full border-b border-outline-variant/15">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Amenities Card */}
              <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2.5xl">concierge</span>
                  <h3 className="font-serif text-2xl font-bold text-on-surface">Amenities</h3>
                </div>
                <ul className="space-y-4 font-sans text-sm text-secondary">
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Valet Parking</span> <span className="text-on-surface font-semibold">Available</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Private Dining</span> <span className="text-on-surface font-semibold">Vault Room</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Wheelchair Access</span> <span className="text-on-surface font-semibold">Fully Accessible</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wi-Fi</span> <span className="text-on-surface font-semibold">Complimentary</span>
                  </li>
                </ul>
              </div>

              {/* Policy & Style Card */}
              <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2.5xl">info</span>
                  <h3 className="font-serif text-2xl font-bold text-on-surface">The Details</h3>
                </div>
                <ul className="space-y-4 font-sans text-sm text-secondary">
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Dress Code</span> <span className="text-on-surface font-semibold">Smart Casual</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Dining Style</span> <span className="text-on-surface font-semibold">Fine Dining</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Payment</span> <span className="text-on-surface font-semibold">Visa, MC, AMEX</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Corkage</span> <span className="text-on-surface font-semibold">£50 per bottle</span>
                  </li>
                </ul>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2.5xl">schedule</span>
                  <h3 className="font-serif text-2xl font-bold text-on-surface">Opening Hours</h3>
                </div>
                <ul className="space-y-4 font-sans text-sm text-secondary">
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Mon - Thu</span> <span className="text-on-surface font-semibold">18:00 - 23:00</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Fri - Sat</span> <span className="text-on-surface font-semibold">12:00 - 00:00</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-3">
                    <span>Sunday</span> <span className="text-on-surface font-semibold">12:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Status</span> <span className="text-primary font-bold">Open for Dinner</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section - Section 2 (Color B: #FBF9F9) */}
        <section className="py-section-gap bg-[#FBF9F9] w-full border-b border-outline-variant/15">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="font-label-sm text-primary tracking-[0.2em] uppercase font-bold">The Philosophy</span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight font-normal">
                  A sanctuary of light and culinary precision.
                </h2>
                <p className="font-sans text-base md:text-lg text-secondary leading-relaxed font-light">
                  At Lumière, we believe the finest dining experiences are those where the service is felt but not seen. Every dish is a dialogue between tradition and innovation, meticulously crafted to showcase the purest essence of seasonal ingredients.
                </p>

                <div className="flex items-center space-x-4 pt-4 border-l-2 border-primary/40 pl-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-2xl">restaurant</span>
                  </div>
                  <p className="font-serif text-lg md:text-xl italic text-on-surface">
                    "The intersection of high-end hospitality and technical precision."
                  </p>
                </div>
              </div>

              <div className="relative group cursor-pointer" onClick={() => setIsChefStoryOpen(true)}>
                <div className="absolute -inset-4 bg-primary-fixed opacity-10 rounded-2xl group-hover:opacity-25 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl h-[480px] shadow-2xl border border-outline-variant/20">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjxo7PTqnkb2ByquvTN4PSJF_aFOMai0e-66m_kY5OcMK4ScTwg9t57oCRYst1rzEc1Neh9Iga_77h8NhDXn967goGSOUgpMHysAY2CIrRlRJ3U6e1itvOO5qradubZrmmoH9PUKg-z1gvg7UrufKkcT9zCRHLBegT0IB6itGigaCDbCHmaqBzpvqf6up6BUoExydS2eQJt_XytyC1J_x5w_EPJit9xmrrqWS2zQa0ONiQUD9kIS7kzrbIZinwkH3ap4F35onxV2Y"
                    alt="Sea Bass Tartare with Citrus Gel"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl text-white flex justify-between items-center border border-white/10">
                    <div>
                      <div className="font-serif text-lg font-bold">Sea Bass Tartare</div>
                      <div className="text-xs text-white/70 font-sans">Citrus gel, edible gold leaf, micro-herbs</div>
                    </div>
                    <span className="material-symbols-outlined">zoom_in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Lumière Gallery (Bento Layout) - Section 3 (Color A: #F4EFE6) */}
        <section className="py-section-gap bg-[#F4EFE6] w-full border-b border-outline-variant/15">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-12 text-center">
              <span className="font-label-sm text-primary uppercase tracking-[0.2em] font-bold">Visual Atmosphere</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface mt-2">The Lumière Gallery</h2>
              <p className="font-sans text-sm md:text-base text-secondary mt-2">Captured moments of invisible excellence</p>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-12 gap-5 auto-rows-[260px]">
              {GALLERY_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`${img.colSpan} rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all border border-outline-variant/20`}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={img.src}
                    alt={img.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <h4 className="font-serif text-xl font-bold">{img.title}</h4>
                    <p className="font-sans text-xs text-white/80 line-clamp-1 mt-1">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chef Story Section - Section 4 (Color B: #FBF9F9) */}
        <section className="py-section-gap bg-[#FBF9F9] w-full">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/3 order-2 md:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border border-outline-variant/20" onClick={() => setIsChefStoryOpen(true)}>
                  <img
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCERWltkKVtse3b_wW36xjpnZH9THUDFygROWcQspdLRJ5HTiu6Q4NBDuP8s0kk_E5oXJtloZBVvgdvk9BSW6eZHPM0JIm2MWQi0JMbTSKmUFPHN4RR69klsdUG0fJLlQmNJl_wd_GzrcIxSvK19U9fBER_3KQL7fA0zIGK-dHc3w62l7nXnZm1R38Mognk_2XXCPih-BC_JYziLjhqu3dAC5c7svqIrWt6KOHKHronMZSMIgEaSepyrh4D-yb3FfW83BWYd5-39AA"
                    alt="Chef Marcelle Vignon"
                  />
                  <div className="absolute bottom-4 right-4 bg-primary text-on-primary p-3 rounded-full shadow-lg">
                    <span className="material-symbols-outlined">menu_book</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/3 order-1 md:order-2 space-y-6">
                <span className="font-label-sm text-tertiary tracking-[0.2em] uppercase font-bold">The Visionary</span>
                <h2 className="font-serif text-4xl md:text-5xl text-on-surface font-semibold">
                  Chef Marcelle Vignon
                </h2>
                <p className="font-serif text-lg md:text-xl text-secondary leading-relaxed italic border-l-2 border-tertiary/40 pl-5">
                  "Culinary art is not found in complexity, but in the radical simplification of a flavor until its soul is revealed. At Lumière, we strip away the noise to let the ingredient speak."
                </p>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  With three Michelin stars and a career spanning the finest kitchens of Lyon and Paris, Chef Vignon brings a technical rigor to Mayfair that is unmatched. Her vision for Lumière was to create a space where diners could lose track of time, anchored only by the rhythm of the season.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setIsChefStoryOpen(true)}
                    className="font-sans text-sm text-primary font-bold flex items-center group hover:underline tracking-wide uppercase"
                  >
                    <span>Read the Full Story</span>
                    <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        onNavigateLanding={() => setCurrentPage('landing')}
        onNavigateMenu={() => setCurrentPage('menu')}
        onNavigateReservations={() => setCurrentPage('reservations')}
        onToast={triggerToast}
      />

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

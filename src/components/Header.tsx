import React, { useState } from 'react';

interface HeaderProps {
  currentPage: 'landing' | 'menu' | 'reservations';
  onNavigateLanding: () => void;
  onNavigateMenu: () => void;
  onNavigateReservations: () => void;
  onToast?: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigateLanding,
  onNavigateMenu,
  onNavigateReservations,
  onToast,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-20 border-b border-outline-variant/10 transition-all">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex justify-between items-center">
        {/* Brand Logo */}
        <div
          onClick={onNavigateLanding}
          className="font-display-lg text-xl sm:text-2xl tracking-tight font-bold text-on-surface flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
          <span>Lumière Reservations</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={onNavigateLanding}
            className={`font-body-md py-1 font-medium transition-colors hover:text-primary ${
              currentPage === 'landing'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            Discover
          </button>

          <button
            onClick={onNavigateReservations}
            className={`font-body-md py-1 font-medium transition-colors hover:text-primary ${
              currentPage === 'reservations'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            Reservations
          </button>

          <button
            onClick={onNavigateMenu}
            className={`font-body-md py-1 font-medium transition-colors hover:text-primary ${
              currentPage === 'menu'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            Menu
          </button>
        </nav>

        {/* Right User Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onToast?.('Signed out of guest session')}
            className="hidden sm:block font-body-md text-secondary hover:text-on-surface transition-colors text-sm"
          >
            Sign Out
          </button>
          <div
            className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20 shadow-sm cursor-pointer"
            onClick={() => onToast?.('Profile preferences loaded')}
          >
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7pRDjvZZnOxAd6pNZUuek8TyUBkAZRBuxC-npyROZRfOdwhAu1I-oYWMmDBXJyNILw50ICBAaDBooBbhtV9DwMil3MhtUB5QqQ5-fVFllIlDA5lr390PM5f51VJ8cmtGSTJB0T3Q6cBN4oJUUKPV4vqiT_EvK1v_Bc-mbek60ngPLhpQYRb7zBHb7chjPtjKDsAOgvl9tDnb8pKvupWbQnoqAOUdRNuJzOEb6hBAeM8d8ruYxYOywfqW0Z_eRC_BuX7uFzNFS45A"
              alt="Luxury Dining Guest Profile"
            />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface rounded-full hover:bg-surface-container-low"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant/20 px-6 py-4 space-y-3 animate-fadeIn shadow-lg">
          <button
            onClick={() => {
              onNavigateLanding();
              setIsMobileMenuOpen(false);
            }}
            className={`block w-full text-left font-body-md py-2 font-medium ${
              currentPage === 'landing' ? 'text-primary font-bold' : 'text-secondary'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => {
              onNavigateReservations();
              setIsMobileMenuOpen(false);
            }}
            className={`block w-full text-left font-body-md py-2 font-medium ${
              currentPage === 'reservations' ? 'text-primary font-bold' : 'text-secondary'
            }`}
          >
            Reservations
          </button>
          <button
            onClick={() => {
              onNavigateMenu();
              setIsMobileMenuOpen(false);
            }}
            className={`block w-full text-left font-body-md py-2 font-medium ${
              currentPage === 'menu' ? 'text-primary font-bold' : 'text-secondary'
            }`}
          >
            Menu
          </button>
          <hr className="border-outline-variant/10" />
          <button
            onClick={() => {
              onToast?.('Signed out of guest session');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left font-body-md text-secondary py-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

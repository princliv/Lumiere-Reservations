import React from 'react';

interface FooterProps {
  onNavigateLanding: () => void;
  onNavigateMenu: () => void;
  onNavigateReservations: () => void;
  onToast?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateLanding,
  onNavigateMenu,
  onNavigateReservations,
  onToast,
}) => {
  return (
    <footer className="bg-surface border-t border-outline-variant/20 pt-16 pb-8 w-full mt-auto">
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
              <li>
                <button className="hover:text-primary transition-colors text-left" onClick={onNavigateLanding}>
                  Discover / Experience
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors text-left" onClick={onNavigateMenu}>
                  Menu
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors text-left" onClick={onNavigateReservations}>
                  Reservations
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors text-left" onClick={onNavigateReservations}>
                  Private Dining
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-sm text-on-surface uppercase mb-6 font-semibold">Contact</h4>
            <ul className="space-y-4 font-body-md text-secondary">
              <li>12 Berkeley Square, Mayfair, London</li>
              <li>+44 (0) 20 7123 4567</li>
              <li>hello@lumiere-dining.com</li>
              <li className="flex space-x-4 pt-2">
                <span
                  className="material-symbols-outlined cursor-pointer hover:text-primary"
                  onClick={() => onToast?.('Share link copied')}
                >
                  share
                </span>
                <span
                  className="material-symbols-outlined cursor-pointer hover:text-primary"
                  onClick={() => onToast?.('Instagram page opened')}
                >
                  camera
                </span>
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
              className="h-6 w-auto object-contain"
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
  );
};

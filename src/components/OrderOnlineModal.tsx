import { useState } from 'react';

interface OrderOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Sea Bass Tartare with Citrus Gel',
    category: 'Starters',
    price: 34,
    description: 'Fresh wild sea bass, edible gold leaf, micro-herbs, ruby grapefruit reduction.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjxo7PTqnkb2ByquvTN4PSJF_aFOMai0e-66m_kY5OcMK4ScTwg9t57oCRYst1rzEc1Neh9Iga_77h8NhDXn967goGSOUgpMHysAY2CIrRlRJ3U6e1itvOO5qradubZrmmoH9PUKg-z1gvg7UrufKkcT9zCRHLBegT0IB6itGigaCDbCHmaqBzpvqf6up6BUoExydS2eQJt_XytyC1J_x5w_EPJit9xmrrqWS2zQa0ONiQUD9kIS7kzrbIZinwkH3ap4F35onxV2Y'
  },
  {
    id: '2',
    name: 'Deconstructed Chocolate Sphere',
    category: 'Desserts',
    price: 28,
    description: 'Valrhona 70% dark chocolate, gold leaf finish, warm hazelnut praline pour.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIb_Uo23kTJpPcIMURUZmNrGyhHrLA_AkoSspLoXESUeC2-QgV1mYlBTlKppD6cilp8R3RB8mMxOlfndzPvfhL7xITN5VCYtU4icw39sQMq5p_re4-y6CvplHpd7U_bLH6AjvF_5pZvgdYCleJD2VLWxbX5KPeDhLZfgMDH3IkQEynd-x99MRLYQ26FI1narcNVF049Tj7tSmABL55PD8_mGdAhJKp7Bej6eAaI1hLCiWlXN50imkpkwNu1W9aTVnGekbswD9zQY'
  },
  {
    id: '3',
    name: 'Château Margaux 2015 Pairing',
    category: 'Fine Wines',
    price: 185,
    description: 'Sommelier selected premier grand cru classé, decanted and sealed for luxury delivery.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ2SwfE-L4ENpw0vIUBXHTsJ5WtR_WchM-HleBOHJAKcVE2EBoTYxscGxwzwDphMvAL9Pm3bTQC8jItpGg-PcEX1N9MSqhU2utK5AyJayd_q0O_cOC9f6IAl0iRpUqomC_fV9pMHcOmnPnX0Sou3nleMjzMJkmyjHFb6knQH015fgsy3GnbPME85GyiNwRQCGkXjkwlICjSCGB3pd2zxXB7PMtsokmlyiVv3KycxRD8J9mx0S1RZFZd-YIMe1fwVXt9dw_1vBgTKw'
  }
];

export const OrderOnlineModal = ({ isOpen, onClose, onSuccess }: OrderOnlineModalProps) => {
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  if (!isOpen) return null;

  const updateQuantity = (id: string, delta: number) => {
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

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = MENU_ITEMS.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  const handleCheckout = () => {
    if (totalItems === 0) return;
    onSuccess(`Online Order Placed! Total £${totalPrice}. Delivery prepared by Lumière team.`);
    setCart({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-surface-container flex items-center justify-between border-b border-outline-variant/20 font-sans">
          <div>
            <span className="font-label-sm text-primary uppercase tracking-[0.2em] font-bold">Lumière To-Go & Delivery</span>
            <h3 className="font-serif text-2xl text-on-surface font-semibold">Gourmet Online Order</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Menu Items List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 font-sans">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low hover:border-outline-variant transition-all">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-lg font-bold text-on-surface">{item.name}</h4>
                    <span className="font-serif text-lg font-bold text-primary">£{item.price}</span>
                  </div>
                  <p className="font-sans text-sm text-secondary line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="flex justify-end items-center gap-3 mt-3">
                  {cart[item.id] ? (
                    <div className="flex items-center gap-3 bg-surface border border-outline-variant rounded-lg px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-secondary hover:text-on-surface">
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="font-sans font-bold text-on-surface text-sm">{cart[item.id]}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-secondary hover:text-on-surface">
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-sans text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-all"
                    >
                      Add to Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer & Checkout */}
        <div className="p-6 bg-surface-container border-t border-outline-variant/20 flex items-center justify-between font-sans">
          <div>
            <div className="text-xs text-secondary font-label-sm uppercase font-bold tracking-wider">Total ({totalItems} items)</div>
            <div className="font-serif text-2xl font-bold text-on-surface">£{totalPrice}</div>
          </div>
          <button
            disabled={totalItems === 0}
            onClick={handleCheckout}
            className={`px-8 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all ${
              totalItems > 0
                ? 'bg-primary text-on-primary hover:bg-primary-container shadow-md active:scale-95'
                : 'bg-surface-container-high text-secondary cursor-not-allowed'
            }`}
          >
            Checkout Order
          </button>
        </div>
      </div>
    </div>
  );
};

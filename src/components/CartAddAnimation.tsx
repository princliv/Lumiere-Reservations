import { useEffect, useState, type CSSProperties } from 'react';

interface CartAddAnimationProps {
  fromCount: number;
  toCount: number;
  onComplete: () => void;
}

export const CartAddAnimation = ({ fromCount, toCount, onComplete }: CartAddAnimationProps) => {
  const [phase, setPhase] = useState<'enter' | 'count' | 'fly' | 'done'>('enter');
  const [displayCount, setDisplayCount] = useState(fromCount);
  const [flyStyle, setFlyStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const enterTimer = window.setTimeout(() => {
      setPhase('count');
      setDisplayCount(toCount);
    }, 160);

    const flyTimer = window.setTimeout(() => {
      const target = document.getElementById('header-cart-btn');
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      if (target) {
        const rect = target.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        setFlyStyle({
          '--fly-x': `${targetX - centerX}px`,
          '--fly-y': `${targetY - centerY}px`,
        } as CSSProperties);
      } else {
        setFlyStyle({
          '--fly-x': `${window.innerWidth / 2 - 48 - centerX}px`,
          '--fly-y': `${48 - centerY}px`,
        } as CSSProperties);
      }
      setPhase('fly');
    }, 380);

    const doneTimer = window.setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 700);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(flyTimer);
      window.clearTimeout(doneTimer);
    };
  }, [fromCount, toCount, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none flex items-center justify-center">
      <div
        className={`cart-fly-orb ${phase === 'enter' ? 'cart-fly-enter' : ''} ${
          phase === 'fly' ? 'cart-fly-to-header' : ''
        }`}
        style={flyStyle}
      >
        <div className="relative w-16 h-16 rounded-full bg-primary text-on-primary shadow-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
          <span
            key={displayCount}
            className={`absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-on-surface text-surface text-[11px] font-bold flex items-center justify-center leading-none shadow ${
              phase !== 'enter' ? 'cart-badge-bump' : ''
            }`}
          >
            {displayCount > 99 ? '99+' : displayCount}
          </span>
        </div>
      </div>
    </div>
  );
};

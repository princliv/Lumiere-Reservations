import { useEffect, type ReactNode } from 'react';
import { applyTheme } from './applyTheme';
import type { BrandSettings } from '../types';

interface ThemeProviderProps {
  brand: Pick<BrandSettings, 'themePresetId' | 'customPrimaryColor' | 'primaryFont' | 'headingFont'> | undefined;
  children: ReactNode;
}

/** Applies BrandSettings -> CSS custom properties consumed by the CDN Tailwind config (index.html). */
export function ThemeProvider({ brand, children }: ThemeProviderProps) {
  useEffect(() => {
    if (brand) applyTheme(brand);
  }, [brand]);

  return <>{children}</>;
}

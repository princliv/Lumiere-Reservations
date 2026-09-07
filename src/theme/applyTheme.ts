import { THEME_PRESETS, type BrandSettings, type FontOption } from '../types';

/** Fonts already preloaded via <link> in index.html - no runtime injection needed. */
const STATIC_FONTS: FontOption[] = ['Cormorant Garamond', 'Geist'];

const loadedFontLinks = new Set<string>(STATIC_FONTS);

function ensureFontLoaded(font: FontOption) {
  if (loadedFontLinks.has(font)) return;
  loadedFontLinks.add(font);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

export function applyTheme(brand: Pick<BrandSettings, 'themePresetId' | 'primaryFont' | 'headingFont'>) {
  const preset = THEME_PRESETS.find((p) => p.id === brand.themePresetId) ?? THEME_PRESETS[0];
  const root = document.documentElement.style;

  root.setProperty('--color-primary', preset.colors.primary);
  root.setProperty('--color-on-primary', preset.colors.onPrimary);
  root.setProperty('--color-primary-container', preset.colors.primaryContainer);
  root.setProperty('--color-primary-fixed', preset.colors.primaryFixed);
  root.setProperty('--color-primary-fixed-dim', preset.colors.primaryFixedDim);
  root.setProperty('--color-on-primary-fixed', preset.colors.onPrimaryFixed);
  root.setProperty('--color-on-primary-fixed-variant', preset.colors.onPrimaryFixedVariant);
  root.setProperty('--color-tertiary', preset.colors.tertiary);

  ensureFontLoaded(brand.headingFont);
  ensureFontLoaded(brand.primaryFont);
  root.setProperty('--font-heading', `'${brand.headingFont}'`);
  root.setProperty('--font-body', `'${brand.primaryFont}'`);
}

import { CUSTOM_THEME_ID, THEME_PRESETS, type BrandSettings, type FontOption } from '../types';
import { generatePaletteFromColor, isValidHexColor } from './paletteFromColor';

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

export function applyTheme(brand: Pick<BrandSettings, 'themePresetId' | 'customPrimaryColor' | 'primaryFont' | 'headingFont'>) {
  const customColor = brand.themePresetId === CUSTOM_THEME_ID ? brand.customPrimaryColor : undefined;
  const colors =
    customColor && isValidHexColor(customColor)
      ? generatePaletteFromColor(customColor)
      : (THEME_PRESETS.find((p) => p.id === brand.themePresetId) ?? THEME_PRESETS[0]).colors;
  const root = document.documentElement.style;

  root.setProperty('--color-primary', colors.primary);
  root.setProperty('--color-on-primary', colors.onPrimary);
  root.setProperty('--color-primary-container', colors.primaryContainer);
  root.setProperty('--color-primary-fixed', colors.primaryFixed);
  root.setProperty('--color-primary-fixed-dim', colors.primaryFixedDim);
  root.setProperty('--color-on-primary-fixed', colors.onPrimaryFixed);
  root.setProperty('--color-on-primary-fixed-variant', colors.onPrimaryFixedVariant);
  root.setProperty('--color-tertiary', colors.tertiary);

  ensureFontLoaded(brand.headingFont);
  ensureFontLoaded(brand.primaryFont);
  root.setProperty('--font-heading', `'${brand.headingFont}'`);
  root.setProperty('--font-body', `'${brand.primaryFont}'`);
}

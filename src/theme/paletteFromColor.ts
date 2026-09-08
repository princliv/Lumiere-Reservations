import type { ThemePreset } from '../types';

interface Hsl {
  h: number;
  s: number;
  l: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const full = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`;
}

function rgbToHsl(r: number, g: number, b: number): Hsl {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/** WCAG relative luminance, used to pick a legible black/white "on" color for any background. */
function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function onColorFor(hex: string): string {
  return relativeLuminance(hex) > 0.32 ? '#241a08' : '#ffffff';
}

export function isValidHexColor(value: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

/**
 * Derives a full Material-style color role set from a single admin-picked hex color,
 * so a custom color still gets legible "on" text and consistent fixed/container tones (plan §41/§53 relaxed to allow custom input, still contrast-checked).
 */
export function generatePaletteFromColor(hex: string): ThemePreset['colors'] {
  const [r, g, b] = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const primary = rgbToHex(r, g, b);

  return {
    primary,
    onPrimary: onColorFor(primary),
    primaryContainer: hslToHex(h, s, l < 50 ? l + 14 : Math.max(l - 14, 20)),
    primaryFixed: hslToHex(h, Math.max(s * 0.7, 30), 90),
    primaryFixedDim: hslToHex(h, Math.max(s * 0.75, 35), 78),
    onPrimaryFixed: hslToHex(h, Math.min(s, 60), 14),
    onPrimaryFixedVariant: hslToHex(h, Math.min(s, 55), 32),
    tertiary: hslToHex(h + 40, Math.max(s * 0.55, 20), Math.min(l, 42)),
  };
}

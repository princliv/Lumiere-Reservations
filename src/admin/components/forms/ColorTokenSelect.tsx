import { useState } from 'react';
import { CUSTOM_THEME_ID, THEME_PRESETS } from '../../../types';
import { isValidHexColor } from '../../../theme/paletteFromColor';

interface ColorTokenSelectProps {
  themePresetId: string;
  customPrimaryColor?: string;
  onChange: (value: { themePresetId: string; customPrimaryColor?: string }) => void;
}

const DEFAULT_CUSTOM_COLOR = '#785600';

/** Admins pick a contrast-checked preset, or "Custom" to choose any color via a picker - a full palette is then derived and contrast-checked automatically. */
export function ColorTokenSelect({ themePresetId, customPrimaryColor, onChange }: ColorTokenSelectProps) {
  const isCustom = themePresetId === CUSTOM_THEME_ID;
  const currentCustomColor = customPrimaryColor && isValidHexColor(customPrimaryColor) ? customPrimaryColor : DEFAULT_CUSTOM_COLOR;
  const [hexInput, setHexInput] = useState(currentCustomColor);

  const commitCustomColor = (hex: string) => {
    setHexInput(hex);
    if (isValidHexColor(hex)) {
      onChange({ themePresetId: CUSTOM_THEME_ID, customPrimaryColor: hex });
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-2">Brand Color Theme</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {THEME_PRESETS.map((preset) => (
          <button
            type="button"
            key={preset.id}
            onClick={() => onChange({ themePresetId: preset.id })}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
              themePresetId === preset.id ? 'border-primary shadow-md' : 'border-outline-variant/30 hover:border-primary/40'
            }`}
          >
            <span
              className="w-10 h-10 rounded-full border border-black/10"
              style={{ backgroundColor: preset.colors.primary }}
            />
            <span className="text-xs font-semibold text-on-surface">{preset.name}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={() => onChange({ themePresetId: CUSTOM_THEME_ID, customPrimaryColor: currentCustomColor })}
          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
            isCustom ? 'border-primary shadow-md' : 'border-outline-variant/30 hover:border-primary/40'
          }`}
        >
          <span
            className="w-10 h-10 rounded-full border border-black/10"
            style={
              isCustom
                ? { backgroundColor: currentCustomColor }
                : { background: 'conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)' }
            }
          />
          <span className="text-xs font-semibold text-on-surface">Custom</span>
        </button>
      </div>

      {isCustom && (
        <div className="flex items-center gap-3 mt-3 p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low">
          <input
            type="color"
            value={currentCustomColor}
            onChange={(e) => commitCustomColor(e.target.value)}
            className="w-10 h-10 rounded-lg border border-outline-variant/40 cursor-pointer bg-transparent p-0"
            aria-label="Pick brand color"
          />
          <div className="flex-1">
            <label className="block text-xs font-semibold text-secondary mb-1">Hex Color</label>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => commitCustomColor(e.target.value)}
              placeholder="#785600"
              maxLength={7}
              className={`w-full px-3 py-1.5 text-sm rounded-lg border bg-surface outline-none font-mono ${
                isValidHexColor(hexInput) ? 'border-outline-variant/40 focus:border-primary' : 'border-red-400'
              }`}
            />
            {!isValidHexColor(hexInput) && <p className="text-xs text-red-600 mt-1">Enter a valid hex color, e.g. #785600</p>}
          </div>
        </div>
      )}
    </div>
  );
}

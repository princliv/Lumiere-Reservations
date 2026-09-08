import { THEME_PRESETS } from '../../../types';

interface ColorTokenSelectProps {
  value: string;
  onChange: (presetId: string) => void;
}

/** Admin picks a complete, contrast-checked preset - never a raw hex/RGB channel (plan §41/§53). */
export function ColorTokenSelect({ value, onChange }: ColorTokenSelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-2">Brand Color Theme</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {THEME_PRESETS.map((preset) => (
          <button
            type="button"
            key={preset.id}
            onClick={() => onChange(preset.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
              value === preset.id ? 'border-primary shadow-md' : 'border-outline-variant/30 hover:border-primary/40'
            }`}
          >
            <span
              className="w-10 h-10 rounded-full border border-black/10"
              style={{ backgroundColor: preset.colors.primary }}
            />
            <span className="text-xs font-semibold text-on-surface">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

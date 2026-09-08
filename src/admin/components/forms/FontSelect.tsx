import { FONT_OPTIONS, type FontOption } from '../../../types';

interface FontSelectProps {
  label: string;
  value: FontOption;
  onChange: (font: FontOption) => void;
}

/** Fixed, controlled list only - no free-text font-family input (plan §9/§41). */
export function FontSelect({ label, value, onChange }: FontSelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FontOption)}
        className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
      >
        {FONT_OPTIONS.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}

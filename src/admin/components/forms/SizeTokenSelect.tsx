import { HEADING_SIZES, type HeadingSize } from '../../../types';

interface SizeTokenSelectProps {
  label: string;
  value: HeadingSize;
  onChange: (size: HeadingSize) => void;
}

const SIZE_LABEL: Record<HeadingSize, string> = { sm: 'Small', md: 'Medium', lg: 'Large' };

/** Small/Medium/Large only - never raw px/margin/grid values (plan §41). */
export function SizeTokenSelect({ label, value, onChange }: SizeTokenSelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-1.5">{label}</label>
      <div className="flex gap-2">
        {HEADING_SIZES.map((size) => (
          <button
            type="button"
            key={size}
            onClick={() => onChange(size)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              value === size ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant/40 text-secondary hover:border-primary/40'
            }`}
          >
            {SIZE_LABEL[size]}
          </button>
        ))}
      </div>
    </div>
  );
}

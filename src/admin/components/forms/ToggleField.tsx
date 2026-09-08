interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export function ToggleField({ label, checked, onChange, description }: ToggleFieldProps) {
  return (
    <label className="flex items-center justify-between gap-4 py-2 cursor-pointer">
      <div>
        <div className="text-sm font-semibold text-on-surface">{label}</div>
        {description && <div className="text-xs text-secondary mt-0.5">{description}</div>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-primary' : 'bg-outline-variant/50'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </label>
  );
}

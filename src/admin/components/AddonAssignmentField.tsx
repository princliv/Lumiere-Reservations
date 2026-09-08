import type { Addon } from '../../types';

interface AddonAssignmentFieldProps {
  allAddons: Addon[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

/** Checklist pattern modeled on ItemCustomizeModal's add-on toggle logic (plan §25). */
export function AddonAssignmentField({ allAddons, selectedIds, onChange }: AddonAssignmentFieldProps) {
  const toggle = (id: string) => {
    onChange(selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id]);
  };

  if (allAddons.length === 0) {
    return <p className="text-sm text-secondary">No add-ons created yet - add some under Menu &rarr; Add-ons first.</p>;
  }

  return (
    <div className="space-y-2">
      {allAddons.map((addon) => (
        <label
          key={addon.id}
          className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
            selectedIds.includes(addon.id) ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-primary/40'
          }`}
        >
          <span className="flex items-center gap-3">
            <input type="checkbox" checked={selectedIds.includes(addon.id)} onChange={() => toggle(addon.id)} className="accent-primary" />
            <span className="text-sm font-medium text-on-surface">{addon.name}</span>
          </span>
          <span className="text-sm font-semibold text-primary">${addon.price.toFixed(2)}</span>
        </label>
      ))}
    </div>
  );
}

import { ToggleField } from '../../../components/forms/ToggleField';
import type { LocationSectionContent } from '../../../../types';

interface EditorProps {
  content: LocationSectionContent;
  onChange: (patch: Partial<LocationSectionContent>) => void;
}

export function LocationSectionEditor({ content, onChange }: EditorProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Heading</label>
        <input
          value={content.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Address Override (optional)</label>
        <input
          value={content.addressOverride ?? ''}
          onChange={(e) => onChange({ addressOverride: e.target.value })}
          placeholder="Leave blank to use Business Information address"
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Google Maps Embed URL</label>
        <input
          value={content.mapEmbedUrlOverride ?? ''}
          onChange={(e) => onChange({ mapEmbedUrlOverride: e.target.value })}
          placeholder="https://www.google.com/maps/embed?..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <ToggleField
        label="Show Opening Hours Table"
        checked={content.showHoursTable}
        onChange={(showHoursTable) => onChange({ showHoursTable })}
      />
    </div>
  );
}

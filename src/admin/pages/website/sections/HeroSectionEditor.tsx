import { ImagePickerField } from '../../../components/forms/ImagePickerField';
import { useMedia } from '../../../hooks/api/useMedia';
import type { HeroSectionContent } from '../../../../types';

interface EditorProps {
  content: HeroSectionContent;
  onChange: (patch: Partial<HeroSectionContent>) => void;
}

export function HeroSectionEditor({ content, onChange }: EditorProps) {
  const { data: media } = useMedia();
  const currentImage = media?.items.find((m) => m.id === content.backgroundMediaId)?.fileUrl;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Eyebrow</label>
        <input
          value={content.eyebrow ?? ''}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
          maxLength={60}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Heading</label>
        <input
          value={content.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          maxLength={80}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Description</label>
        <textarea
          value={content.description}
          onChange={(e) => onChange({ description: e.target.value })}
          maxLength={240}
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Button Text</label>
          <input
            value={content.buttonText}
            onChange={(e) => onChange({ buttonText: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Button Link</label>
          <select
            value={content.buttonLink}
            onChange={(e) => onChange({ buttonLink: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          >
            <option value="/reservations">Reservations</option>
            <option value="/menu">Menu</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Secondary Button Text</label>
          <input
            value={content.secondaryButtonText ?? ''}
            onChange={(e) => onChange({ secondaryButtonText: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Secondary Button Link</label>
          <select
            value={content.secondaryButtonLink ?? '/menu'}
            onChange={(e) => onChange({ secondaryButtonLink: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          >
            <option value="/menu">Menu</option>
            <option value="/reservations">Reservations</option>
          </select>
        </div>
      </div>

      <ImagePickerField
        label="Background Image"
        currentImageUrl={currentImage}
        onSelect={(asset) => onChange({ backgroundMediaId: asset.id })}
        onRemove={() => onChange({ backgroundMediaId: null })}
      />

      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">
          Overlay Darkness ({content.overlayOpacity}%)
        </label>
        <input
          type="range"
          min={0}
          max={90}
          value={content.overlayOpacity}
          onChange={(e) => onChange({ overlayOpacity: Number(e.target.value) })}
          className="w-full accent-[#785600]"
        />
      </div>
    </div>
  );
}

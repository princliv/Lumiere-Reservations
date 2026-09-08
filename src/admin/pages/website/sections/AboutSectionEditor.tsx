import { ImagePickerField } from '../../../components/forms/ImagePickerField';
import { useMedia } from '../../../hooks/api/useMedia';
import type { AboutSectionContent } from '../../../../types';

interface EditorProps {
  content: AboutSectionContent;
  onChange: (patch: Partial<AboutSectionContent>) => void;
}

export function AboutSectionEditor({ content, onChange }: EditorProps) {
  const { data: media } = useMedia();
  const imageUrl = (id?: string | null) => media?.items.find((m) => m.id === id)?.fileUrl;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Eyebrow</label>
        <input
          value={content.eyebrow ?? ''}
          onChange={(e) => onChange({ eyebrow: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Heading</label>
        <input
          value={content.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Description</label>
        <textarea
          value={content.description}
          onChange={(e) => onChange({ description: e.target.value })}
          maxLength={500}
          rows={4}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Pull Quote</label>
        <input
          value={content.quote ?? ''}
          onChange={(e) => onChange({ quote: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
      </div>

      <ImagePickerField
        label="Section Image"
        currentImageUrl={imageUrl(content.imageMediaId)}
        onSelect={(asset) => onChange({ imageMediaId: asset.id })}
        onRemove={() => onChange({ imageMediaId: null })}
      />

      <div className="pt-4 border-t border-outline-variant/20 space-y-5">
        <h4 className="text-sm font-bold text-on-surface uppercase tracking-wide">Chef Story (optional)</h4>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Chef Name</label>
          <input
            value={content.chefName ?? ''}
            onChange={(e) => onChange({ chefName: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Chef Quote</label>
          <textarea
            value={content.chefQuote ?? ''}
            onChange={(e) => onChange({ chefQuote: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Chef Bio</label>
          <textarea
            value={content.chefBio ?? ''}
            onChange={(e) => onChange({ chefBio: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <ImagePickerField
          label="Chef Photo"
          currentImageUrl={imageUrl(content.chefImageMediaId)}
          onSelect={(asset) => onChange({ chefImageMediaId: asset.id })}
          onRemove={() => onChange({ chefImageMediaId: null })}
        />
      </div>
    </div>
  );
}

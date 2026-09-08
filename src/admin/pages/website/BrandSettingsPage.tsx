import { useEffect, useState } from 'react';
import { useBrandDraft, usePublishWebsite, useUpdateBrand, useWebsiteStatus } from '../../hooks/api/useWebsite';
import { useAdminToast } from '../../context/AdminToastContext';
import { PublishBar } from '../../components/PublishBar';
import { FontSelect } from '../../components/forms/FontSelect';
import { ColorTokenSelect } from '../../components/forms/ColorTokenSelect';
import { FONT_WEIGHTS, type BrandSettings, type FontWeight } from '../../../types';

export function BrandSettingsPage() {
  const { data: brand } = useBrandDraft();
  const { data: website } = useWebsiteStatus();
  const updateBrand = useUpdateBrand();
  const publishWebsite = usePublishWebsite();
  const { showToast } = useAdminToast();

  const [draft, setDraft] = useState<BrandSettings | null>(null);
  useEffect(() => {
    if (brand) setDraft(brand);
  }, [brand]);

  if (!draft) return <p className="text-secondary text-sm">Loading brand settings...</p>;

  const isDirty = JSON.stringify(draft) !== JSON.stringify(brand);

  const handleSaveDraft = async () => {
    await updateBrand.mutateAsync(draft);
    showToast('Draft saved.');
  };

  const handlePublish = async () => {
    if (isDirty) await updateBrand.mutateAsync(draft);
    await publishWebsite.mutateAsync();
    showToast('Website published.');
  };

  return (
    <div>
      <PublishBar
        isDirty={isDirty}
        isSaving={updateBrand.isPending}
        isPublishing={publishWebsite.isPending}
        onSaveDraft={handleSaveDraft}
        onPreview={() => window.open('/?preview=true', '_blank')}
        onPublish={handlePublish}
        lastPublishedAt={website?.publishedAt}
      />
      <h1 className="font-serif text-2xl font-bold text-on-surface mb-6">Branding</h1>

      <div className="space-y-8 max-w-xl">
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wide">Typography</h3>
          <FontSelect label="Primary Font (body, nav, buttons)" value={draft.primaryFont} onChange={(primaryFont) => setDraft({ ...draft, primaryFont })} />
          <FontSelect label="Heading Font" value={draft.headingFont} onChange={(headingFont) => setDraft({ ...draft, headingFont })} />
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">Font Weight</label>
            <select
              value={draft.fontWeight}
              onChange={(e) => setDraft({ ...draft, fontWeight: e.target.value as FontWeight })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
            >
              {FONT_WEIGHTS.map((w) => (
                <option key={w} value={w} className="capitalize">
                  {w}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section>
          <ColorTokenSelect
            themePresetId={draft.themePresetId}
            customPrimaryColor={draft.customPrimaryColor}
            onChange={(value) => setDraft({ ...draft, ...value })}
          />
        </section>

        <p className="text-xs text-secondary">
          Social links, contact details, and business information are managed under Restaurant in the sidebar.
        </p>
      </div>
    </div>
  );
}

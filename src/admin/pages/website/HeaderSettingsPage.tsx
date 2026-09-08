import { useEffect, useState } from 'react';
import { useBrandDraft, usePublishWebsite, useUpdateBrand, useWebsiteStatus } from '../../hooks/api/useWebsite';
import { useAdminToast } from '../../context/AdminToastContext';
import { PublishBar } from '../../components/PublishBar';
import { ImagePickerField } from '../../components/forms/ImagePickerField';
import { ColorTokenSelect } from '../../components/forms/ColorTokenSelect';
import { useMedia } from '../../hooks/api/useMedia';
import type { BrandSettings } from '../../../types';

export function HeaderSettingsPage() {
  const { data: brand } = useBrandDraft();
  const { data: website } = useWebsiteStatus();
  const updateBrand = useUpdateBrand();
  const publishWebsite = usePublishWebsite();
  const { showToast } = useAdminToast();
  const { data: media } = useMedia();

  const [draft, setDraft] = useState<BrandSettings | null>(null);
  useEffect(() => {
    if (brand) setDraft(brand);
  }, [brand]);

  if (!draft) return <p className="text-secondary text-sm">Loading header settings...</p>;

  const isDirty = JSON.stringify(draft) !== JSON.stringify(brand);
  const logoUrl = media?.items.find((m) => m.id === draft.logoMediaId)?.fileUrl;

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
      <h1 className="font-serif text-2xl font-bold text-on-surface mb-6">Header</h1>

      <div className="space-y-6 max-w-xl">
        <ImagePickerField
          label="Logo"
          currentImageUrl={logoUrl}
          onSelect={(asset) => setDraft({ ...draft, logoMediaId: asset.id })}
          onRemove={() => setDraft({ ...draft, logoMediaId: null })}
        />

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Restaurant Name</label>
          <input
            value={draft.restaurantName}
            onChange={(e) => setDraft({ ...draft, restaurantName: e.target.value })}
            maxLength={100}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>

        <ColorTokenSelect value={draft.themePresetId} onChange={(themePresetId) => setDraft({ ...draft, themePresetId })} />
        <p className="text-xs text-secondary -mt-3">Header background, text and button colors follow this site-wide theme.</p>
      </div>
    </div>
  );
}

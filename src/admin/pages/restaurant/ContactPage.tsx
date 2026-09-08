import { useEffect, useState } from 'react';
import { useBrandDraft, usePublishWebsite, useUpdateBrand, useWebsiteStatus } from '../../hooks/api/useWebsite';
import { useAdminToast } from '../../context/AdminToastContext';
import { PublishBar } from '../../components/PublishBar';
import type { BrandSettings } from '../../../types';

export function ContactPage() {
  const { data: brand } = useBrandDraft();
  const { data: website } = useWebsiteStatus();
  const updateBrand = useUpdateBrand();
  const publishWebsite = usePublishWebsite();
  const { showToast } = useAdminToast();

  const [draft, setDraft] = useState<BrandSettings | null>(null);
  useEffect(() => {
    if (brand) setDraft(brand);
  }, [brand]);

  if (!draft) return <p className="text-secondary text-sm">Loading...</p>;
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
      <h1 className="font-serif text-2xl font-bold text-on-surface mb-6">Contact</h1>

      <div className="space-y-5 max-w-xl">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Phone</label>
          <input
            value={draft.contact.phone}
            onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, phone: e.target.value } })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Email</label>
          <input
            value={draft.contact.email}
            onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, email: e.target.value } })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Address</label>
          <input
            value={draft.contact.address}
            onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, address: e.target.value } })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Google Maps Embed URL</label>
          <input
            value={draft.contact.mapEmbedUrl ?? ''}
            onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, mapEmbedUrl: e.target.value } })}
            placeholder="https://www.google.com/maps/embed?..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useBrandDraft, usePublishWebsite, useUpdateBrand, useWebsiteStatus } from '../../hooks/api/useWebsite';
import { useAdminToast } from '../../context/AdminToastContext';
import { PublishBar } from '../../components/PublishBar';
import { ToggleField } from '../../components/forms/ToggleField';
import type { BrandSettings } from '../../../types';

const DAY_LABEL: Record<string, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};

export function HoursPage() {
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

  const updateDay = (day: string, patch: Partial<BrandSettings['businessHours'][number]>) => {
    setDraft({
      ...draft,
      businessHours: draft.businessHours.map((h) => (h.day === day ? { ...h, ...patch } : h)),
    });
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
      <h1 className="font-serif text-2xl font-bold text-on-surface mb-6">Opening Hours</h1>

      <div className="space-y-2 max-w-2xl">
        {draft.businessHours.map((h) => (
          <div key={h.day} className="flex items-center gap-4 bg-surface rounded-xl border border-outline-variant/20 p-4">
            <span className="w-28 font-semibold text-on-surface text-sm">{DAY_LABEL[h.day]}</span>
            <ToggleField label="Closed" checked={h.isClosed} onChange={(isClosed) => updateDay(h.day, { isClosed })} />
            {!h.isClosed && (
              <>
                <input
                  type="time"
                  value={h.openTime ?? ''}
                  onChange={(e) => updateDay(h.day, { openTime: e.target.value })}
                  className="px-3 py-1.5 text-sm rounded-lg border border-outline-variant/30 bg-surface-container-low"
                />
                <span className="text-secondary">to</span>
                <input
                  type="time"
                  value={h.closeTime ?? ''}
                  onChange={(e) => updateDay(h.day, { closeTime: e.target.value })}
                  className="px-3 py-1.5 text-sm rounded-lg border border-outline-variant/30 bg-surface-container-low"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

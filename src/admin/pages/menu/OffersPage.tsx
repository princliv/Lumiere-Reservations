import { useState } from 'react';
import { useCreateOffer, useDeleteOffer, useOffers, useUpdateOffer } from '../../hooks/api/useOffers';
import { useMenu } from '../../hooks/api/useMenu';
import { useAdminToast } from '../../context/AdminToastContext';
import { DataTable } from '../../components/DataTable';
import { ToggleField } from '../../components/forms/ToggleField';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { Offer, OfferType } from '../../../types';

const EMPTY: Partial<Offer> = {
  name: '', type: 'percentage', discountValue: 10, isActive: true,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10),
  appliesToItemIds: [], appliesToCategoryIds: [],
};

const OFFER_TYPE_LABEL: Record<OfferType, string> = {
  percentage: 'Percentage Discount', fixed: 'Fixed Discount', special_price: 'Special Price', bogo: 'Buy One Get One',
};

export function OffersPage() {
  const { data: offers, isLoading } = useOffers();
  const { data: menu } = useMenu();
  const createOffer = useCreateOffer();
  const updateOffer = useUpdateOffer();
  const deleteOffer = useDeleteOffer();
  const { showToast } = useAdminToast();

  const [form, setForm] = useState<Partial<Offer> | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Offer | null>(null);

  if (isLoading) return <p className="text-secondary text-sm">Loading offers...</p>;

  const handleSave = async () => {
    if (!form?.name?.trim()) return;
    if (form.id) {
      await updateOffer.mutateAsync({ offerId: form.id, payload: form });
      showToast('Offer updated.');
    } else {
      await createOffer.mutateAsync(form);
      showToast('Offer created.');
    }
    setForm(null);
  };

  const toggleItem = (itemId: string) => {
    if (!form) return;
    const ids = form.appliesToItemIds ?? [];
    setForm({ ...form, appliesToItemIds: ids.includes(itemId) ? ids.filter((i) => i !== itemId) : [...ids, itemId] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-on-surface">Offers & Promotions</h1>
          <p className="text-secondary text-sm mt-1">Discounts and promotions linked to menu items.</p>
        </div>
        <button onClick={() => setForm(EMPTY)} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container">
          + Add Offer
        </button>
      </div>

      <DataTable
        rows={offers ?? []}
        rowKey={(o) => o.id}
        emptyMessage="No offers created yet."
        columns={[
          { header: 'Name', render: (o) => <span className="font-semibold text-on-surface">{o.name}</span> },
          { header: 'Type', render: (o) => OFFER_TYPE_LABEL[o.type] },
          { header: 'Valid Through', render: (o) => new Date(o.endDate).toLocaleDateString() },
          {
            header: 'Active',
            render: (o) => <ToggleField label="" checked={o.isActive} onChange={(isActive) => updateOffer.mutate({ offerId: o.id, payload: { isActive } })} />,
          },
          {
            header: '',
            render: (o) => (
              <div className="flex gap-2 justify-end">
                <button onClick={() => setForm(o)} className="px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-medium hover:bg-surface-container-high">
                  Edit
                </button>
                <button onClick={() => setPendingDelete(o)} className="text-error hover:opacity-70">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ),
          },
        ]}
      />

      {form && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-surface w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant/20 p-6 space-y-4 my-8">
            <h3 className="font-serif text-xl font-bold text-on-surface">{form.id ? 'Edit Offer' : 'New Offer'}</h3>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Offer Name</label>
              <input value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Offer Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as OfferType })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface">
                  {Object.entries(OFFER_TYPE_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              {form.type === 'special_price' ? (
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1.5">Special Price ($)</label>
                  <input type="number" value={form.specialPrice ?? 0} onChange={(e) => setForm({ ...form, specialPrice: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
                </div>
              ) : form.type !== 'bogo' ? (
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1.5">Discount Value {form.type === 'percentage' ? '(%)' : '($)'}</label>
                  <input type="number" value={form.discountValue ?? 0} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Start Date</label>
                <input type="date" value={form.startDate?.slice(0, 10)} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">End Date</label>
                <input type="date" value={form.endDate?.slice(0, 10)} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">CTA Text</label>
              <input value={form.cta ?? ''} onChange={(e) => setForm({ ...form, cta: e.target.value })} placeholder="Order Now" className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Applies to Items</label>
              <div className="max-h-40 overflow-y-auto space-y-1 border border-outline-variant/30 rounded-lg p-2">
                {menu?.items.map((item) => (
                  <label key={item.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-surface-container-high cursor-pointer text-sm">
                    <input type="checkbox" checked={(form.appliesToItemIds ?? []).includes(item.id)} onChange={() => toggleItem(item.id)} className="accent-primary" />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setForm(null)} className="px-4 py-2 rounded-xl border border-outline-variant/40 text-sm font-medium hover:bg-surface-container-high">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(pendingDelete)}
        title="Delete offer?"
        description={`"${pendingDelete?.name}" will be removed and unlinked from any menu items.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteOffer.mutateAsync(pendingDelete.id);
            showToast('Offer deleted.');
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

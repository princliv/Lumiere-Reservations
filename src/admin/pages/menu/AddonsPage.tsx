import { useState } from 'react';
import { useAddons, useCreateAddon, useDeleteAddon, useUpdateAddon } from '../../hooks/api/useAddons';
import { useAdminToast } from '../../context/AdminToastContext';
import { DataTable } from '../../components/DataTable';
import { ToggleField } from '../../components/forms/ToggleField';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { Addon } from '../../../types';

const EMPTY: Partial<Addon> = { name: '', price: 0, description: '', isAvailable: true, group: 'Add-on Items' };

export function AddonsPage() {
  const { data: addons, isLoading } = useAddons();
  const createAddon = useCreateAddon();
  const updateAddon = useUpdateAddon();
  const deleteAddon = useDeleteAddon();
  const { showToast } = useAdminToast();

  const [form, setForm] = useState<Partial<Addon> | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Addon | null>(null);

  if (isLoading) return <p className="text-secondary text-sm">Loading add-ons...</p>;

  const handleSave = async () => {
    if (!form?.name?.trim()) return;
    if (form.id) {
      await updateAddon.mutateAsync({ addonId: form.id, payload: form });
      showToast('Add-on updated.');
    } else {
      await createAddon.mutateAsync(form);
      showToast('Add-on created.');
    }
    setForm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-on-surface">Add-ons</h1>
          <p className="text-secondary text-sm mt-1">Extras guests can add to a dish (extra cheese, sauces, drinks...).</p>
        </div>
        <button onClick={() => setForm(EMPTY)} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container">
          + Add Add-on
        </button>
      </div>

      <DataTable
        rows={addons ?? []}
        rowKey={(a) => a.id}
        emptyMessage="No add-ons created yet."
        columns={[
          { header: 'Name', render: (a) => <span className="font-semibold text-on-surface">{a.name}</span> },
          { header: 'Group', render: (a) => a.group ?? '—' },
          { header: 'Price', render: (a) => `$${a.price.toFixed(2)}` },
          {
            header: 'Available',
            render: (a) => <ToggleField label="" checked={a.isAvailable} onChange={(isAvailable) => updateAddon.mutate({ addonId: a.id, payload: { isAvailable } })} />,
          },
          {
            header: '',
            render: (a) => (
              <div className="flex gap-2 justify-end">
                <button onClick={() => setForm(a)} className="px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-medium hover:bg-surface-container-high">
                  Edit
                </button>
                <button onClick={() => setPendingDelete(a)} className="text-error hover:opacity-70">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ),
          },
        ]}
      />

      {form && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant/20 p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-on-surface">{form.id ? 'Edit Add-on' : 'New Add-on'}</h3>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Name</label>
              <input value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Price ($)</label>
              <input type="number" step={0.01} value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Description</label>
              <input value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Group</label>
              <input value={form.group ?? ''} onChange={(e) => setForm({ ...form, group: e.target.value })} placeholder="e.g. Beverages" className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
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
        title="Delete add-on?"
        description={`"${pendingDelete?.name}" will be removed and unassigned from any menu items.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteAddon.mutateAsync(pendingDelete.id);
            showToast('Add-on deleted.');
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

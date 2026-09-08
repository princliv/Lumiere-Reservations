import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateMenuItem, useMenu, useUpdateMenuItem } from '../../hooks/api/useMenu';
import { useAddons } from '../../hooks/api/useAddons';
import { useOffers } from '../../hooks/api/useOffers';
import { useAdminToast } from '../../context/AdminToastContext';
import { ImagePickerField } from '../../components/forms/ImagePickerField';
import { ToggleField } from '../../components/forms/ToggleField';
import { TagInput } from '../../components/forms/TagInput';
import { AddonAssignmentField } from '../../components/AddonAssignmentField';
import type { FoodType, MenuItem, MenuItemVariant } from '../../../types';
import { tempId } from '../../utils/tempId';

const EMPTY_ITEM: Partial<MenuItem> = {
  name: '', description: '', price: 0, categoryId: '', foodType: 'na', tags: [],
  prepTimeMinutes: undefined, isAvailable: true, isFeatured: false, variants: [], addonIds: [], activeOfferId: null,
};

export function MenuItemFormPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const isNew = !itemId || itemId === 'new';
  const navigate = useNavigate();
  const { data: menu } = useMenu();
  const { data: addons } = useAddons();
  const { data: offers } = useOffers();
  const createItem = useCreateMenuItem();
  const updateItem = useUpdateMenuItem();
  const { showToast } = useAdminToast();

  const [form, setForm] = useState<Partial<MenuItem>>(EMPTY_ITEM);

  useEffect(() => {
    if (!isNew && menu) {
      const existing = menu.items.find((i) => i.id === itemId);
      if (existing) setForm(existing);
    }
  }, [isNew, itemId, menu]);

  const set = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!form.name?.trim() || !form.categoryId) {
      showToast('Name and category are required.', 'error');
      return;
    }
    if (isNew) {
      await createItem.mutateAsync(form);
      showToast('Menu item created.');
    } else if (itemId) {
      await updateItem.mutateAsync({ itemId, payload: form });
      showToast('Menu item updated.');
    }
    navigate('/admin/menu/items');
  };

  const variants = form.variants ?? [];
  const updateVariant = (id: string, patch: Partial<MenuItemVariant>) =>
    set('variants', variants.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  const addVariant = () => set('variants', [...variants, { id: tempId('variant'), name: '', price: form.price ?? 0, isDefault: variants.length === 0 }]);
  const removeVariant = (id: string) => set('variants', variants.filter((v) => v.id !== id));

  return (
    <div className="space-y-6 max-w-2xl">
      <button onClick={() => navigate('/admin/menu/items')} className="flex items-center gap-1 text-sm text-secondary hover:text-on-surface">
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to Menu Items
      </button>
      <h1 className="font-serif text-2xl font-bold text-on-surface">{isNew ? 'Add Menu Item' : 'Edit Menu Item'}</h1>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Item Name *</label>
          <input
            value={form.name ?? ''}
            onChange={(e) => set('name', e.target.value)}
            maxLength={100}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Description</label>
          <textarea
            value={form.description ?? ''}
            onChange={(e) => set('description', e.target.value)}
            rows={3}
            maxLength={400}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">Price ($) *</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={form.price ?? 0}
              onChange={(e) => set('price', Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">Category *</label>
            <select
              value={form.categoryId ?? ''}
              onChange={(e) => set('categoryId', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
            >
              <option value="">Select category</option>
              {menu?.categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <ImagePickerField
          label="Image"
          currentImageUrl={form.imageUrl}
          onSelect={(asset) => setForm((prev) => ({ ...prev, imageMediaId: asset.id, imageUrl: asset.fileUrl }))}
          onRemove={() => setForm((prev) => ({ ...prev, imageMediaId: null, imageUrl: undefined }))}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">Food Type</label>
            <select
              value={form.foodType ?? 'na'}
              onChange={(e) => set('foodType', e.target.value as FoodType)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
            >
              <option value="veg">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non_veg">Non-Vegetarian</option>
              <option value="na">Not Applicable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">Preparation Time (min)</label>
            <input
              type="number"
              min={0}
              value={form.prepTimeMinutes ?? ''}
              onChange={(e) => set('prepTimeMinutes', Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
            />
          </div>
        </div>

        <TagInput label="Tags" tags={form.tags ?? []} onChange={(tags) => set('tags', tags)} />

        <div className="flex gap-8">
          <ToggleField label="Available" checked={form.isAvailable ?? true} onChange={(v) => set('isAvailable', v)} />
          <ToggleField label="Featured" checked={form.isFeatured ?? false} onChange={(v) => set('isFeatured', v)} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-on-surface">Variants (e.g. Small / Medium / Large)</label>
            <button onClick={addVariant} className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container">
              + Add Variant
            </button>
          </div>
          <div className="space-y-2">
            {variants.map((v) => (
              <div key={v.id} className="flex items-center gap-2">
                <input
                  value={v.name}
                  onChange={(e) => updateVariant(v.id, { name: e.target.value })}
                  placeholder="Name"
                  className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-outline-variant/30 bg-surface-container-low"
                />
                <input
                  type="number"
                  value={v.price}
                  onChange={(e) => updateVariant(v.id, { price: Number(e.target.value) })}
                  className="w-24 px-3 py-1.5 text-sm rounded-lg border border-outline-variant/30 bg-surface-container-low"
                />
                <button onClick={() => removeVariant(v.id)} className="text-error">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2">Add-ons</label>
          <AddonAssignmentField
            allAddons={addons ?? []}
            selectedIds={form.addonIds ?? []}
            onChange={(ids) => set('addonIds', ids)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Offer</label>
          <select
            value={form.activeOfferId ?? ''}
            onChange={(e) => set('activeOfferId', e.target.value || null)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
          >
            <option value="">No offer</option>
            {offers?.map((o) => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
          <button onClick={() => navigate('/admin/menu/items')} className="px-4 py-2 rounded-xl border border-outline-variant/40 text-sm font-medium hover:bg-surface-container-high">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={createItem.isPending || updateItem.isPending}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container disabled:opacity-50"
          >
            {isNew ? 'Create Item' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

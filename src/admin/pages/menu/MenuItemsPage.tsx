import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteMenuItem,
  useMenu,
  useReorderMenuItems,
  useSetItemAvailability,
} from '../../hooks/api/useMenu';
import { useAdminToast } from '../../context/AdminToastContext';
import { usePermissions } from '../../hooks/usePermissions';
import { ReorderableList } from '../../components/ReorderableList';
import { ToggleField } from '../../components/forms/ToggleField';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { StatusPill } from '../../components/StatusPill';
import type { MenuItem } from '../../../types';

export function MenuItemsPage() {
  const { data: menu, isLoading } = useMenu();
  const setAvailability = useSetItemAvailability();
  const deleteItem = useDeleteMenuItem();
  const reorderItems = useReorderMenuItems();
  const { showToast } = useAdminToast();
  const { canDeleteMenuItems } = usePermissions();
  const navigate = useNavigate();
  const [pendingDelete, setPendingDelete] = useState<MenuItem | null>(null);

  if (isLoading || !menu) return <p className="text-secondary text-sm">Loading menu items...</p>;

  const categoryName = new Map(menu.categories.map((c) => [c.id, c.name]));
  const items = [...menu.items].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleReorder = (next: MenuItem[]) => {
    reorderItems.mutate(next.map((i, idx) => ({ id: i.id, displayOrder: idx })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-on-surface">Menu Items</h1>
          <p className="text-secondary text-sm mt-1">Drag to reorder. Toggle availability instantly without deleting.</p>
        </div>
        <button
          onClick={() => navigate('/admin/menu/items/new')}
          className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-colors"
        >
          + Add Menu Item
        </button>
      </div>

      <ReorderableList
        items={items}
        onReorder={handleReorder}
        renderItem={(item, dragHandle) => (
          <div className="flex items-center gap-4 bg-surface rounded-xl border border-outline-variant/20 p-4 shadow-sm">
            {dragHandle}
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-on-surface truncate">{item.name}</div>
              <div className="text-xs text-secondary">{categoryName.get(item.categoryId) ?? 'Uncategorized'} · £{item.price.toFixed(2)}</div>
            </div>
            {item.isFeatured && <StatusPill label="Featured" tone="positive" />}
            <ToggleField
              label="Available"
              checked={item.isAvailable}
              onChange={(isAvailable) => setAvailability.mutate({ itemId: item.id, isAvailable })}
            />
            <button onClick={() => navigate(`/admin/menu/items/${item.id}`)} className="px-3 py-2 rounded-lg border border-outline-variant/40 text-sm font-medium hover:bg-surface-container-high">
              Edit
            </button>
            {canDeleteMenuItems && (
              <button onClick={() => setPendingDelete(item)} className="text-error hover:opacity-70">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            )}
          </div>
        )}
      />

      <ConfirmDialog
        isOpen={Boolean(pendingDelete)}
        title="Delete menu item?"
        description={`"${pendingDelete?.name}" will be removed from your menu. This is a soft delete and can be recovered by support if needed.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteItem.mutateAsync(pendingDelete.id);
            showToast('Menu item deleted.');
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

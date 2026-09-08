import { useState } from 'react';
import {
  useCreateCategory,
  useDeleteCategory,
  useMenu,
  useReorderCategories,
  useUpdateCategory,
} from '../../hooks/api/useMenu';
import { useAdminToast } from '../../context/AdminToastContext';
import { ReorderableList } from '../../components/ReorderableList';
import { ToggleField } from '../../components/forms/ToggleField';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { MenuCategory } from '../../../types';

export function CategoriesPage() {
  const { data: menu, isLoading } = useMenu();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const reorderCategories = useReorderCategories();
  const { showToast } = useAdminToast();

  const [newName, setNewName] = useState('');
  const [pendingDelete, setPendingDelete] = useState<MenuCategory | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  if (isLoading || !menu) return <p className="text-secondary text-sm">Loading categories...</p>;

  const categories = [...menu.categories].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    await createCategory.mutateAsync({ name: newName.trim() });
    setNewName('');
    showToast('Category created.');
  };

  const handleReorder = (next: MenuCategory[]) => {
    reorderCategories.mutate(next.map((c, idx) => ({ id: c.id, displayOrder: idx })));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-on-surface">Menu Categories</h1>
        <p className="text-secondary text-sm mt-1">Organize your menu into categories, and drag to reorder.</p>
      </div>

      <div className="flex gap-2 max-w-md">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="New category name"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
        />
        <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold hover:bg-primary-container">
          Add
        </button>
      </div>

      <ReorderableList
        items={categories}
        onReorder={handleReorder}
        renderItem={(category, dragHandle) => (
          <div className="flex items-center gap-3 bg-surface rounded-xl border border-outline-variant/20 p-4 shadow-sm">
            {dragHandle}
            {editingId === category.id ? (
              <input
                autoFocus
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => {
                  updateCategory.mutate({ categoryId: category.id, payload: { name: editingName } });
                  setEditingId(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                className="flex-1 px-2 py-1 text-sm rounded-lg border border-primary bg-surface-container-low"
              />
            ) : (
              <button
                className="flex-1 text-left font-semibold text-on-surface"
                onClick={() => {
                  setEditingId(category.id);
                  setEditingName(category.name);
                }}
              >
                {category.name}
              </button>
            )}
            <ToggleField label="" checked={category.isVisible} onChange={(isVisible) => updateCategory.mutate({ categoryId: category.id, payload: { isVisible } })} />
            <button onClick={() => setPendingDelete(category)} className="text-error hover:opacity-70">
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        isOpen={Boolean(pendingDelete)}
        title="Delete category?"
        description={`"${pendingDelete?.name}" will be removed. Items in this category will need reassigning.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteCategory.mutateAsync(pendingDelete.id);
            showToast('Category deleted.');
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

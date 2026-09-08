import { useState } from 'react';
import { useCreateUser, useDeleteUser, useUsers } from '../../hooks/api/useUsers';
import { useAdminToast } from '../../context/AdminToastContext';
import { DataTable } from '../../components/DataTable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { StatusPill } from '../../components/StatusPill';
import type { Role, User } from '../../../types';

export function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();
  const { showToast } = useAdminToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'staff' as Role });
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

  if (isLoading) return <p className="text-secondary text-sm">Loading users...</p>;

  const handleCreate = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    await createUser.mutateAsync(form);
    showToast('User invited.');
    setIsFormOpen(false);
    setForm({ name: '', email: '', role: 'staff' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-on-surface">Users</h1>
          <p className="text-secondary text-sm mt-1">Restaurant staff and owner accounts with admin panel access.</p>
        </div>
        <button onClick={() => setIsFormOpen(true)} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container">
          + Invite User
        </button>
      </div>

      <DataTable
        rows={users ?? []}
        rowKey={(u) => u.id}
        emptyMessage="No additional users yet."
        columns={[
          { header: 'Name', render: (u) => <span className="font-semibold text-on-surface">{u.name}</span> },
          { header: 'Email', render: (u) => u.email },
          { header: 'Role', render: (u) => <StatusPill label={u.role.replace('_', ' ')} tone={u.role === 'owner' ? 'positive' : 'neutral'} /> },
          {
            header: '',
            render: (u) => (
              <button onClick={() => setPendingDelete(u)} className="text-error hover:opacity-70">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            ),
          },
        ]}
      />

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-sm rounded-2xl shadow-2xl border border-outline-variant/20 p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-on-surface">Invite User</h3>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface">
                <option value="staff">Staff (menu availability only)</option>
                <option value="owner">Owner (full access)</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-xl border border-outline-variant/40 text-sm font-medium hover:bg-surface-container-high">
                Cancel
              </button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container">
                Invite
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(pendingDelete)}
        title="Remove user?"
        description={`"${pendingDelete?.name}" will lose access to the admin panel.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteUser.mutateAsync(pendingDelete.id);
            showToast('User removed.');
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

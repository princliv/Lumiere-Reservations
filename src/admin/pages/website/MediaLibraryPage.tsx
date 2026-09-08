import { useRef, useState } from 'react';
import { useDeleteMedia, useMedia, useUploadMedia } from '../../hooks/api/useMedia';
import { useAdminToast } from '../../context/AdminToastContext';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export function MediaLibraryPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useMedia({ search: search || undefined });
  const uploadMedia = useUploadMedia();
  const deleteMedia = useDeleteMedia();
  const { showToast } = useAdminToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    await uploadMedia.mutateAsync({ file, opts: { folder: 'images' } });
    showToast('Media uploaded.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-on-surface">Media Library</h1>
          <p className="text-secondary text-sm mt-1">Upload and reuse images across your website.</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadMedia.isPending}
          className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">upload</span>
          {uploadMedia.isPending ? 'Uploading...' : 'Upload Media'}
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search media by name..."
        className="w-full max-w-sm px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface focus:border-primary outline-none"
      />

      {isLoading ? (
        <p className="text-secondary text-sm">Loading media...</p>
      ) : !data?.items.length ? (
        <div className="text-center py-16 bg-surface rounded-2xl border border-outline-variant/20">
          <span className="material-symbols-outlined text-4xl text-secondary mb-2">perm_media</span>
          <p className="text-secondary text-sm">No media uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.items.map((asset) => (
            <div key={asset.id} className="group relative aspect-square rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low">
              <img src={asset.fileUrl} alt={asset.altText ?? asset.fileName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button onClick={() => setPendingDeleteId(asset.id)} className="text-white">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-2 py-1 truncate">{asset.fileName}</div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(pendingDeleteId)}
        title="Delete media?"
        description="This file will be removed from your media library. Any sections still referencing it will show a broken image."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={async () => {
          if (pendingDeleteId) {
            await deleteMedia.mutateAsync(pendingDeleteId);
            showToast('Media deleted.');
          }
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}

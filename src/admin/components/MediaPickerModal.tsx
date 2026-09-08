import { useRef, useState } from 'react';
import { useMedia, useUploadMedia } from '../hooks/api/useMedia';
import type { MediaAsset } from '../../types';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (asset: MediaAsset) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useMedia({ search: search || undefined });
  const uploadMedia = useUploadMedia();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleUpload = async (file: File) => {
    const asset = await uploadMedia.mutateAsync({ file, opts: { folder: 'images' } });
    onSelect(asset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-3xl rounded-2xl shadow-2xl border border-outline-variant/20 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-5 border-b border-outline-variant/20">
          <h3 className="font-serif text-xl font-bold text-on-surface">Media Library</h3>
          <button onClick={onClose} className="text-secondary hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-4 border-b border-outline-variant/20 flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-outline-variant/40 bg-surface-container-low focus:border-primary outline-none"
          />
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
            className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">upload</span>
            {uploadMedia.isPending ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="text-center py-12 text-secondary text-sm">Loading media...</div>
          ) : !data?.items.length ? (
            <div className="text-center py-12 text-secondary text-sm">No media yet. Upload an image to get started.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.items.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => {
                    onSelect(asset);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-outline-variant/30 hover:border-primary transition-colors"
                >
                  <img src={asset.fileUrl} alt={asset.altText ?? asset.fileName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100">check_circle</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

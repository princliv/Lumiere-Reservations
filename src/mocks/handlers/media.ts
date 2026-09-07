import { http, HttpResponse } from 'msw';
import { db, nextId, nowIso } from '../db';
import type { MediaFolder, MediaType } from '../../types';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const mediaHandlers = [
  http.get('*/api/v1/restaurants/:id/media', ({ params, request }) => {
    const restaurantId = params.id as string;
    const url = new URL(request.url);
    const type = url.searchParams.get('type') as MediaType | null;
    const folder = url.searchParams.get('folder') as MediaFolder | null;
    const search = url.searchParams.get('search')?.toLowerCase();

    let items = db.data.media.filter((m) => m.restaurantId === restaurantId);
    if (type) items = items.filter((m) => m.fileType === type);
    if (folder) items = items.filter((m) => m.folder === folder);
    if (search) items = items.filter((m) => m.fileName.toLowerCase().includes(search) || m.altText?.toLowerCase().includes(search));

    return HttpResponse.json({ items, total: items.length, page: 1, pageSize: items.length });
  }),

  http.post('*/api/v1/restaurants/:id/media', async ({ params, request }) => {
    const restaurantId = params.id as string;
    const form = await request.formData();
    const file = form.get('file') as File | null;
    if (!file) return HttpResponse.json({ error: { code: 'validation', message: 'File is required.' } }, { status: 400 });

    const dataUrl = await readFileAsDataUrl(file);
    const now = nowIso();
    const asset = {
      id: nextId('media'),
      restaurantId,
      fileUrl: dataUrl,
      fileType: (file.type.startsWith('video') ? 'video' : 'image') as 'video' | 'image',
      mimeType: file.type,
      fileName: file.name,
      fileSizeBytes: file.size,
      altText: (form.get('altText') as string) || undefined,
      folder: (form.get('folder') as MediaFolder) || 'images',
      createdAt: now,
      updatedAt: now,
    };
    db.data.media.push(asset);
    db.save();
    return HttpResponse.json(asset, { status: 201 });
  }),

  http.delete('*/api/v1/restaurants/:id/media/:mediaId', ({ params }) => {
    db.data.media = db.data.media.filter((m) => m.id !== params.mediaId);
    db.save();
    return HttpResponse.json({ message: 'Media deleted.' });
  }),
];

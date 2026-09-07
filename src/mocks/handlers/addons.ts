import { http, HttpResponse } from 'msw';
import { db, nextId, nowIso } from '../db';

export const addonHandlers = [
  http.get('*/api/v1/restaurants/:id/addons', ({ params }) =>
    HttpResponse.json(db.data.addons.filter((a) => a.restaurantId === params.id)),
  ),

  http.post('*/api/v1/restaurants/:id/addons', async ({ params, request }) => {
    const restaurantId = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    const now = nowIso();
    const addon = {
      id: nextId('addon'),
      restaurantId,
      name: (body.name as string) ?? 'Untitled Add-on',
      price: (body.price as number) ?? 0,
      description: body.description as string | undefined,
      isVeg: body.isVeg as boolean | undefined,
      isAvailable: (body.isAvailable as boolean) ?? true,
      group: body.group as string | undefined,
      groupSelection: body.groupSelection as 'single' | 'multiple' | undefined,
      createdAt: now,
      updatedAt: now,
    };
    db.data.addons.push(addon);
    db.save();
    return HttpResponse.json(addon, { status: 201 });
  }),

  http.put('*/api/v1/restaurants/:id/addons/:addonId', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const addon = db.data.addons.find((a) => a.id === params.addonId);
    if (!addon) return HttpResponse.json({ error: { code: 'not_found', message: 'Add-on not found.' } }, { status: 404 });
    Object.assign(addon, body, { updatedAt: nowIso() });
    db.save();
    return HttpResponse.json(addon);
  }),

  http.delete('*/api/v1/restaurants/:id/addons/:addonId', ({ params }) => {
    db.data.addons = db.data.addons.filter((a) => a.id !== params.addonId);
    db.save();
    return HttpResponse.json({ message: 'Add-on deleted.' });
  }),
];

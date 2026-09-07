import { http, HttpResponse } from 'msw';
import { db, nextId, nowIso } from '../db';

export const offerHandlers = [
  http.get('*/api/v1/restaurants/:id/offers', ({ params }) =>
    HttpResponse.json(db.data.offers.filter((o) => o.restaurantId === params.id)),
  ),

  http.post('*/api/v1/restaurants/:id/offers', async ({ params, request }) => {
    const restaurantId = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    const now = nowIso();
    const offer = {
      id: nextId('offer'),
      restaurantId,
      name: (body.name as string) ?? 'Untitled Offer',
      type: (body.type as string) ?? 'percentage',
      discountValue: body.discountValue as number | undefined,
      specialPrice: body.specialPrice as number | undefined,
      startDate: (body.startDate as string) ?? now,
      endDate: (body.endDate as string) ?? now,
      isActive: (body.isActive as boolean) ?? true,
      appliesToItemIds: (body.appliesToItemIds as string[]) ?? [],
      appliesToCategoryIds: (body.appliesToCategoryIds as string[]) ?? [],
      cta: body.cta as string | undefined,
      imageMediaId: body.imageMediaId as string | null | undefined,
      createdAt: now,
      updatedAt: now,
    };
    db.data.offers.push(offer as (typeof db.data.offers)[number]);
    db.save();
    return HttpResponse.json(offer, { status: 201 });
  }),

  http.put('*/api/v1/restaurants/:id/offers/:offerId', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const offer = db.data.offers.find((o) => o.id === params.offerId);
    if (!offer) return HttpResponse.json({ error: { code: 'not_found', message: 'Offer not found.' } }, { status: 404 });
    Object.assign(offer, body, { updatedAt: nowIso() });
    db.save();
    return HttpResponse.json(offer);
  }),

  http.delete('*/api/v1/restaurants/:id/offers/:offerId', ({ params }) => {
    db.data.offers = db.data.offers.filter((o) => o.id !== params.offerId);
    db.save();
    return HttpResponse.json({ message: 'Offer deleted.' });
  }),
];

import { http, HttpResponse } from 'msw';
import { db, nextId, nowIso } from '../db';

export const menuHandlers = [
  http.get('*/api/v1/restaurants/:id/menu', ({ params }) => {
    const restaurantId = params.id as string;
    const categories = db.data.categories.filter((c) => c.restaurantId === restaurantId && !c.deletedAt);
    const items = db.data.items.filter((i) => i.restaurantId === restaurantId && !i.deletedAt);
    return HttpResponse.json({ categories, items });
  }),

  http.post('*/api/v1/restaurants/:id/menu/categories', async ({ params, request }) => {
    const restaurantId = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    const now = nowIso();
    const category = {
      id: nextId('cat'),
      restaurantId,
      name: (body.name as string) ?? 'Untitled Category',
      description: body.description as string | undefined,
      imageMediaId: (body.imageMediaId as string | null) ?? null,
      displayOrder: db.data.categories.filter((c) => c.restaurantId === restaurantId).length,
      isVisible: true,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    db.data.categories.push(category);
    db.save();
    return HttpResponse.json(category, { status: 201 });
  }),

  http.put('*/api/v1/restaurants/:id/menu/categories/:categoryId', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const category = db.data.categories.find((c) => c.id === params.categoryId);
    if (!category) return HttpResponse.json({ error: { code: 'not_found', message: 'Category not found.' } }, { status: 404 });
    Object.assign(category, body, { updatedAt: nowIso() });
    db.save();
    return HttpResponse.json(category);
  }),

  http.delete('*/api/v1/restaurants/:id/menu/categories/:categoryId', ({ params }) => {
    const category = db.data.categories.find((c) => c.id === params.categoryId);
    if (category) {
      category.deletedAt = nowIso();
      db.save();
    }
    return HttpResponse.json({ message: 'Category deleted.' });
  }),

  http.put('*/api/v1/restaurants/:id/menu/categories/order', async ({ request }) => {
    const { order } = (await request.json()) as { order: { id: string; displayOrder: number }[] };
    order.forEach(({ id, displayOrder }) => {
      const category = db.data.categories.find((c) => c.id === id);
      if (category) category.displayOrder = displayOrder;
    });
    db.save();
    return HttpResponse.json(db.data.categories);
  }),

  http.post('*/api/v1/restaurants/:id/menu/items', async ({ params, request }) => {
    const restaurantId = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    const now = nowIso();
    const item = {
      id: nextId('item'),
      restaurantId,
      categoryId: body.categoryId as string,
      name: (body.name as string) ?? 'Untitled Item',
      description: (body.description as string) ?? '',
      price: (body.price as number) ?? 0,
      imageMediaId: (body.imageMediaId as string | null) ?? null,
      imageUrl: body.imageUrl as string | undefined,
      foodType: (body.foodType as string) ?? 'na',
      tags: (body.tags as string[]) ?? [],
      prepTimeMinutes: body.prepTimeMinutes as number | undefined,
      rating: undefined,
      reviewCount: undefined,
      isAvailable: (body.isAvailable as boolean) ?? true,
      isFeatured: (body.isFeatured as boolean) ?? false,
      displayOrder: db.data.items.filter((i) => i.restaurantId === restaurantId).length,
      variants: (body.variants as unknown[]) ?? [],
      addonIds: (body.addonIds as string[]) ?? [],
      activeOfferId: (body.activeOfferId as string | null) ?? null,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    db.data.items.push(item as (typeof db.data.items)[number]);
    db.save();
    return HttpResponse.json(item, { status: 201 });
  }),

  http.put('*/api/v1/restaurants/:id/menu/items/:itemId', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const item = db.data.items.find((i) => i.id === params.itemId);
    if (!item) return HttpResponse.json({ error: { code: 'not_found', message: 'Item not found.' } }, { status: 404 });
    Object.assign(item, body, { updatedAt: nowIso() });
    db.save();
    return HttpResponse.json(item);
  }),

  http.patch('*/api/v1/restaurants/:id/menu/items/:itemId/availability', async ({ params, request }) => {
    const { isAvailable } = (await request.json()) as { isAvailable: boolean };
    const item = db.data.items.find((i) => i.id === params.itemId);
    if (!item) return HttpResponse.json({ error: { code: 'not_found', message: 'Item not found.' } }, { status: 404 });
    item.isAvailable = isAvailable;
    item.updatedAt = nowIso();
    db.save();
    return HttpResponse.json(item);
  }),

  http.delete('*/api/v1/restaurants/:id/menu/items/:itemId', ({ params }) => {
    const item = db.data.items.find((i) => i.id === params.itemId);
    if (item) {
      item.deletedAt = nowIso();
      db.save();
    }
    return HttpResponse.json({ message: 'Item deleted.' });
  }),

  http.put('*/api/v1/restaurants/:id/menu/items/order', async ({ request }) => {
    const { order } = (await request.json()) as { order: { id: string; displayOrder: number }[] };
    order.forEach(({ id, displayOrder }) => {
      const item = db.data.items.find((i) => i.id === id);
      if (item) item.displayOrder = displayOrder;
    });
    db.save();
    return HttpResponse.json(db.data.items);
  }),
];

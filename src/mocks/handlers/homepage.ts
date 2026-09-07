import { http, HttpResponse } from 'msw';
import { db, nowIso } from '../db';
import type { HomepageSectionType, PublishStatus } from '../../types';

function versionParam(request: Request): PublishStatus {
  const url = new URL(request.url);
  return (url.searchParams.get('version') as PublishStatus) || 'published';
}

export const homepageHandlers = [
  http.get('*/api/v1/restaurants/:id/homepage', ({ params, request }) => {
    const restaurantId = params.id as string;
    const version = versionParam(request);
    const homepage = db.data.homepage[restaurantId];
    if (!homepage) return HttpResponse.json({ error: { code: 'not_found', message: 'Not found.' } }, { status: 404 });
    return HttpResponse.json(homepage[version]);
  }),

  http.put('*/api/v1/restaurants/:id/homepage/sections/order', async ({ params, request }) => {
    const restaurantId = params.id as string;
    const { order } = (await request.json()) as { order: { sectionId: string; order: number }[] };
    const homepage = db.data.homepage[restaurantId];
    if (!homepage) return HttpResponse.json({ error: { code: 'not_found', message: 'Not found.' } }, { status: 404 });
    order.forEach(({ sectionId, order: newOrder }) => {
      const section = homepage.draft.sections.find((s) => s.id === sectionId);
      if (section) section.order = newOrder;
    });
    homepage.draft.sections.sort((a, b) => a.order - b.order);
    db.save();
    return HttpResponse.json(homepage.draft.sections);
  }),

  http.put('*/api/v1/restaurants/:id/homepage/sections/:type', async ({ params, request }) => {
    const restaurantId = params.id as string;
    const type = params.type as HomepageSectionType;
    const body = (await request.json()) as { visible?: boolean; content?: Record<string, unknown> };
    const homepage = db.data.homepage[restaurantId];
    if (!homepage) return HttpResponse.json({ error: { code: 'not_found', message: 'Not found.' } }, { status: 404 });
    const section = homepage.draft.sections.find((s) => s.type === type);
    if (!section) return HttpResponse.json({ error: { code: 'not_found', message: 'Section not found.' } }, { status: 404 });
    if (body.visible !== undefined) section.visible = body.visible;
    if (body.content) section.content = { ...section.content, ...body.content } as typeof section.content;
    section.updatedAt = nowIso();
    db.save();
    return HttpResponse.json(section);
  }),
];

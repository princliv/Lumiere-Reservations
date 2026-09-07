import type { Id, ISODateString, Tenant } from './common';

export type AuditAction = 'create' | 'update' | 'delete' | 'publish' | 'unpublish';
export type AuditEntityType =
  | 'menu_item'
  | 'category'
  | 'addon'
  | 'offer'
  | 'homepage_section'
  | 'brand_settings'
  | 'website_settings'
  | 'media'
  | 'user';

export interface AuditLogEntry extends Tenant {
  id: Id;
  actorUserId: Id;
  actorName: string;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId: Id;
  summary: string;
  diff?: Record<string, { from: unknown; to: unknown }>;
  createdAt: ISODateString;
}

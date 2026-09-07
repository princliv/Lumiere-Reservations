export type Id = string;
export type ISODateString = string;

export interface Timestamps {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SoftDeletable {
  deletedAt: ISODateString | null;
}

export interface Tenant {
  restaurantId: Id;
}

export type PublishStatus = 'draft' | 'published';

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

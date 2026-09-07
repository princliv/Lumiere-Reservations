import type { Id, Tenant, Timestamps } from './common';

export type MediaType = 'image' | 'video';
export type MediaFolder = 'images' | 'videos' | 'logos';

export interface MediaAsset extends Tenant, Timestamps {
  id: Id;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: MediaType;
  mimeType: string;
  fileName: string;
  fileSizeBytes: number;
  altText?: string;
  folder?: MediaFolder;
}

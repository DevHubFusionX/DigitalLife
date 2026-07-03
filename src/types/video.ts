import type { ResourceCategory } from './resource';

export interface VideoResource {
  id: string;
  title: string;
  category: ResourceCategory;
  description: string;
  youtubeUrl: string;
  /** Extracted 11-char YouTube video ID */
  youtubeId: string;
  /** Full-quality thumbnail URL built from youtubeId */
  thumbnailUrl: string;
  createdAt: string; // ISO string
}

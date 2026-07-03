export type ResourceCategory =
  | 'Strategy'
  | 'Operations'
  | 'Marketing'
  | 'Leadership'
  | 'AI & Tech';

export type ResourceFormat = 'Guides' | 'Template' | 'Kit' | 'Ebook' | 'Video';

export interface Resource {
  id: string;
  title: string;
  category: string;
  format: string;
  description: string;
  /** Tailwind gradient classes — used as fallback when no coverImage is set */
  coverBg: string;
  coverTitle: string;
  /** Cloudinary URL — optional; if set, replaces gradient on the card frame */
  coverImage?: string | null;
  /** Optional YouTube URL attached to this resource */
  youtubeUrl?: string | null;
  fileSize?: string | null;
  softwareRequired?: string | null;
  deliverables?: string[];
  outcomes?: string[];
  isFree: boolean;
  price?: number;
  featured?: boolean;
  downloadUrl?: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}


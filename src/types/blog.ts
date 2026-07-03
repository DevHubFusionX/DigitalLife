export interface BlogSection {
  heading: string;
  anchor: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string; // URL Slug, e.g. 'systems-first-scaling'
  title: string;
  subtitle: string;
  category: string;
  date: string; // e.g. "Sep 19, 2026"
  author: string;
  authorRole: string;
  readTime: string; // e.g. "6 min read"
  coverBg: string; // Tailwind gradient fallback
  coverLabel: string; // Card cover label
  introduction: string;
  sections: BlogSection[];
  keyTakeaway: string;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

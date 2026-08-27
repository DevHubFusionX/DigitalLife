import { useEffect } from 'react';

interface PageSEOOptions {
  title: string;
  description?: string;
  keywords?: string;
}

function updateMetaTag(name: string, content?: string) {
  if (!content) return;
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Custom hook to update document title and SEO meta tags cleanly.
 */
export function usePageSEO({ title, description, keywords }: PageSEOOptions) {
  useEffect(() => {
    document.title = title;
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
  }, [title, description, keywords]);
}

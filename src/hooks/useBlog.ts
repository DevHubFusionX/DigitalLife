import { useState, useEffect } from 'react';
import type { BlogPost } from '../types/blog';
import { subscribeToPosts } from '../lib/firestore/blog';

interface UseBlogReturn {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
}

/**
 * Real-time Firestore listener for the blog posts collection.
 */
export function useBlog(): UseBlogReturn {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = subscribeToPosts((data) => {
        setPosts(data);
        setLoading(false);
        setError(null);
      });
      return unsubscribe;
    } catch (err) {
      console.warn('[useBlog] Firestore subscription failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown Firestore error'));
      setLoading(false);
    }
  }, []);

  return { posts, loading, error };
}

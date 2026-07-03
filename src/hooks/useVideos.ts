import { useState, useEffect } from 'react';
import type { VideoResource } from '../types/video';
import { subscribeToVideos } from '../lib/firestore/videos';

interface UseVideosReturn {
  videos: VideoResource[];
  loading: boolean;
  error: Error | null;
}

/**
 * Real-time Firestore listener for the videos collection.
 * Returns an empty array (not an error) when no videos have been added yet.
 */
export function useVideos(): UseVideosReturn {
  const [videos, setVideos] = useState<VideoResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToVideos(
      (data) => {
        setVideos(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.warn('[useVideos] Firestore unavailable:', err.message);
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { videos, loading, error };
}

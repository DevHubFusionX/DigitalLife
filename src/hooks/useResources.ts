import { useState, useEffect } from 'react';
import type { Resource } from '../types/resource';
import { subscribeToResources } from '../lib/firestore/resources';
import { DEFAULT_RESOURCES } from '../data/defaultResources';

interface UseResourcesReturn {
  resources: Resource[];
  loading: boolean;
  error: Error | null;
}

/**
 * Real-time Firestore listener for the resources collection.
 * Falls back to DEFAULT_RESOURCES if Firestore is empty or unavailable,
 * ensuring the public page always renders content.
 */
export function useResources(): UseResourcesReturn {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToResources(
      (data) => {
        setResources(data.length > 0 ? data : DEFAULT_RESOURCES);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.warn('[useResources] Firestore unavailable — using defaults:', err.message);
        setResources(DEFAULT_RESOURCES);
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { resources, loading, error };
}

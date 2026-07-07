import { useState, useEffect } from 'react';
import type { Playbook } from '../types/playbook';
import { subscribeToPlaybooks } from '../lib/firestore/playbooks';
import { DEFAULT_PLAYBOOKS } from '../data/defaultPlaybooks';

interface UsePlaybooksReturn {
  playbooks: Playbook[];
  loading: boolean;
  error: Error | null;
}

/**
 * Real-time Firestore listener for the playbooks collection.
 * Falls back to DEFAULT_PLAYBOOKS if Firestore is empty or unavailable,
 * ensuring the public page always renders content.
 */
export function usePlaybooks(): UsePlaybooksReturn {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPlaybooks(
      (data) => {
        setPlaybooks(data.length > 0 ? data : DEFAULT_PLAYBOOKS);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.warn('[usePlaybooks] Firestore unavailable — using defaults:', err.message);
        setPlaybooks(DEFAULT_PLAYBOOKS);
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { playbooks, loading, error };
}

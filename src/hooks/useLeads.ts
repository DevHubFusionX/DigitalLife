import { useState, useEffect } from 'react';
import type { Lead } from '../types/lead';
import { subscribeToLeads } from '../lib/firestore/leads';

interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: Error | null;
}

/**
 * Real-time Firestore listener for the leads collection.
 */
export function useLeads(): UseLeadsReturn {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLeads(
      (data) => {
        setLeads(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('[useLeads] Firestore subscription failed:', err.message);
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { leads, loading, error };
}

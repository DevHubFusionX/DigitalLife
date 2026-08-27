import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Lead } from '../../types/lead';
import { toIsoTimestamp } from './common';

const COLLECTION = 'leads';

/**
 * Subscribes to all leads in real-time, ordered by creation time descending.
 */
export function subscribeToLeads(
  onData: (leads: Lead[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const leads = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name || '',
          email: data.email || '',
          resourceId: data.resourceId || '',
          resourceTitle: data.resourceTitle || '',
          createdAt: toIsoTimestamp(data.createdAt),
          isPaid: data.isPaid || false,
          amountPaid: data.amountPaid || 0,
          paymentRef: data.paymentRef || '',
        } as Lead;
      });
      onData(leads);
    },
    (err) => onError?.(err as Error)
  );
}

/** Adds a new lead document. */
export async function addLead(data: Omit<Lead, 'id' | 'createdAt'>) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

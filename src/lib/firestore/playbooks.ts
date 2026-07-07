import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
  Timestamp,
  type Unsubscribe,
  writeBatch,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Playbook } from '../../types/playbook';
import { DEFAULT_PLAYBOOKS } from '../../data/defaultPlaybooks';

const COLLECTION = 'playbooks';

/** Normalises a Firestore Timestamp or string to an ISO string. */
function toIso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === 'string') return value;
  return new Date().toISOString();
}

/**
 * Subscribes to the playbooks Firestore collection (real-time).
 * @returns Unsubscribe function — call on component unmount.
 */
export function subscribeToPlaybooks(
  onData: (playbooks: Playbook[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const playbooks = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          initials: data.initials || '',
          name: data.name || '',
          role: data.role || '',
          description: data.description || '',
          avatarUrl: data.avatarUrl || null,
          linkedResourceId: data.linkedResourceId || null,
          linkedResourceLabel: data.linkedResourceLabel || '',
          order: data.order ?? 0,
          createdAt: toIso(data.createdAt),
          updatedAt: toIso(data.updatedAt),
        } as Playbook;
      });
      onData(playbooks);
    },
    (err) => onError?.(err as Error)
  );
}

/** Adds a new playbook document. Returns the new doc reference. */
export async function addPlaybook(
  data: Omit<Playbook, 'id' | 'createdAt' | 'updatedAt'>
) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Updates an existing playbook document. */
export async function updatePlaybook(
  id: string,
  data: Partial<Omit<Playbook, 'id' | 'createdAt'>>
) {
  return setDoc(
    doc(db, COLLECTION, id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Deletes a playbook document by ID. */
export async function deletePlaybook(id: string) {
  return deleteDoc(doc(db, COLLECTION, id));
}

/**
 * Seeds Firestore with the default playbooks using their preset IDs.
 * Safe to call multiple times — uses setDoc (overwrites).
 */
export async function seedDefaultPlaybooks() {
  const writes = DEFAULT_PLAYBOOKS.map((playbook) => {
    const { id, createdAt: _c, updatedAt: _u, ...rest } = playbook;
    return setDoc(doc(db, COLLECTION, id), {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  return Promise.all(writes);
}

/** Wipes all playbooks from the Firestore collection. */
export async function wipeAllPlaybooks() {
  const querySnapshot = await getDocs(collection(db, COLLECTION));
  const batch = writeBatch(db);
  querySnapshot.forEach((d) => {
    batch.delete(d.ref);
  });
  await batch.commit();
}

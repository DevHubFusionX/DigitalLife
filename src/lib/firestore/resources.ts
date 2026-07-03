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
import type { Resource } from '../../types/resource';
import { DEFAULT_RESOURCES } from '../../data/defaultResources';

const COLLECTION = 'resources';

/** Normalises a Firestore Timestamp or string to an ISO string. */
function toIso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === 'string') return value;
  return new Date().toISOString();
}

/**
 * Subscribes to the resources Firestore collection (real-time).
 * @returns Unsubscribe function — call on component unmount.
 */
export function subscribeToResources(
  onData: (resources: Resource[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const resources = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          ...data,
          id: d.id,
          title: data.title || '',
          category: data.category || data.topic || '',
          format: data.format || '',
          description: data.description || '',
          coverBg: data.coverBg || data.coverGradient || 'from-[#0f172a] to-[#1e293b]',
          coverTitle: data.coverTitle || data.title || '',
          coverImage: data.coverImage || data.coverUrl || null,
          isFree: data.isFree !== undefined ? data.isFree : (data.contentType === 'Free' ? true : false),
          price: data.price !== undefined ? data.price : (data.contentType === 'Free' ? 0 : (data.price || 0)),
          featured: data.featured === true || String(data.featured) === 'true',
          downloadUrl: data.downloadUrl || null,
          createdAt: toIso(data.createdAt),
          updatedAt: toIso(data.updatedAt),
        } as Resource;
      });
      onData(resources);
    },
    (err) => onError?.(err as Error)
  );
}

/** Adds a new resource document. Returns the new doc reference. */
export async function addResource(
  data: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>
) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Updates an existing resource document. */
export async function updateResource(
  id: string,
  data: Partial<Omit<Resource, 'id' | 'createdAt'>>
) {
  return setDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/** Deletes a resource document by ID. */
export async function deleteResource(id: string) {
  return deleteDoc(doc(db, COLLECTION, id));
}

import { seedDefaultMetadata } from './metadata';

/**
 * Seeds Firestore with the 8 default resources using their numeric string IDs.
 * Safe to call multiple times — uses setDoc with merge:false (overwrites).
 * Triggered from Admin > Settings.
 */
export async function seedDefaultResources() {
  await seedDefaultMetadata(true);
  const writes = DEFAULT_RESOURCES.map((resource) => {
    const { id, createdAt: _c, updatedAt: _u, ...rest } = resource;
    return setDoc(doc(db, COLLECTION, id), {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  return Promise.all(writes);
}

/** Wipes all resources from the Firestore collection. */
export async function wipeAllResources() {
  const querySnapshot = await getDocs(collection(db, COLLECTION));
  const batch = writeBatch(db);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { VideoResource } from '../../types/video';

const COLLECTION = 'videos';

function toIso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === 'string') return value;
  return new Date().toISOString();
}

/**
 * Subscribes to the videos Firestore collection (real-time).
 * @returns Unsubscribe function — call on component unmount.
 */
export function subscribeToVideos(
  onData: (videos: VideoResource[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const videos = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          ...data,
          id: d.id,
          createdAt: toIso(data.createdAt),
        } as VideoResource;
      });
      onData(videos);
    },
    (err) => onError?.(err as Error)
  );
}

/** Adds a new video resource document. */
export async function addVideo(
  data: Omit<VideoResource, 'id' | 'createdAt'>
) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/** Updates an existing video resource document. */
export async function updateVideo(
  id: string,
  data: Partial<Omit<VideoResource, 'id' | 'createdAt'>>
) {
  return updateDoc(doc(db, COLLECTION, id), data);
}

/** Deletes a video resource document by ID. */
export async function deleteVideo(id: string) {
  return deleteDoc(doc(db, COLLECTION, id));
}

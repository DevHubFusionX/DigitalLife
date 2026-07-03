import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDocs,
  writeBatch,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { BlogPost } from '../../types/blog';
import { DEFAULT_POSTS } from '../../data/defaultPosts';

const COLLECTION = 'posts';

/** Subscribes to all blog posts in real-time, ordered by date or creation time. */
export function subscribeToPosts(callback: (posts: BlogPost[]) => void) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        // Fallback for dates if they are Firestore Timestamps or missing
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt || new Date().toISOString(),
      } as BlogPost;
    });
    callback(posts);
  });
}

/** Adds a new blog post using its clean URL slug as the Firestore Document ID. */
export async function addPost(slug: string, data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');
  const ref = doc(db, COLLECTION, cleanSlug);

  // Check if document already exists
  const existing = await getDoc(ref);
  if (existing.exists()) {
    throw new Error('A blog post with this slug or title already exists.');
  }

  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Updates a blog post, handling document ID (slug) renames if necessary. */
export async function updatePost(
  oldId: string,
  newId: string,
  data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
) {
  const cleanOld = oldId.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');
  const cleanNew = newId.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');

  if (cleanOld === cleanNew) {
    const ref = doc(db, COLLECTION, cleanOld);
    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } else {
    // Check if new ID already exists to prevent overwriting another post
    const newRef = doc(db, COLLECTION, cleanNew);
    const existing = await getDoc(newRef);
    if (existing.exists()) {
      throw new Error('A blog post with the new slug already exists.');
    }

    // Fetch existing document to preserve its exact createdAt timestamp
    const oldRef = doc(db, COLLECTION, cleanOld);
    const oldSnap = await getDoc(oldRef);
    if (!oldSnap.exists()) {
      throw new Error('Original blog post could not be found.');
    }
    const oldData = oldSnap.data();

    // Write new document
    await setDoc(newRef, {
      ...oldData,
      ...data,
      updatedAt: serverTimestamp(),
    });

    // Delete old document
    await deleteDoc(oldRef);
  }
}

/** Deletes a blog post by its document ID (slug). */
export async function deletePost(id: string) {
  const cleanId = id.trim().toLowerCase();
  await deleteDoc(doc(db, COLLECTION, cleanId));
}

/** Wipes all blog posts from Firestore. */
export async function wipeAllPosts() {
  const querySnapshot = await getDocs(collection(db, COLLECTION));
  const batch = writeBatch(db);
  querySnapshot.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });
  await batch.commit();
}

/** Wipes and re-seeds the default 9 blog posts into Firestore. */
export async function seedDefaultPosts() {
  await wipeAllPosts();
  const batch = writeBatch(db);
  
  DEFAULT_POSTS.forEach((post) => {
    const { id, ...rest } = post;
    const ref = doc(db, COLLECTION, id);
    batch.set(ref, {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });

  await batch.commit();
}

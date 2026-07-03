import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Category {
  id: string;
  name: string;
}

export interface Format {
  id: string;
  name: string;
}

// ─── Categories ──────────────────────────────────────────────────────────────

export function subscribeCategories(callback: (categories: Category[]) => void) {
  const q = query(collection(db, 'categories'), orderBy('name', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
    }));
    callback(categories);
  });
}

export async function addCategory(name: string): Promise<string> {
  const docRef = await addDoc(collection(db, 'categories'), { name: name.trim() });
  return docRef.id;
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, 'categories', id));
}

// ─── Formats ─────────────────────────────────────────────────────────────────

export function subscribeFormats(callback: (formats: Format[]) => void) {
  const q = query(collection(db, 'formats'), orderBy('name', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const formats = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
    }));
    callback(formats);
  });
}

export async function addFormat(name: string): Promise<string> {
  const docRef = await addDoc(collection(db, 'formats'), { name: name.trim() });
  return docRef.id;
}

export async function deleteFormat(id: string): Promise<void> {
  await deleteDoc(doc(db, 'formats', id));
}

// ─── Seeding Defaults ────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES = ['Strategy', 'Operations', 'Marketing', 'Leadership', 'AI & Tech'];
const DEFAULT_FORMATS = ['Guides', 'Template', 'Kit', 'Ebook', 'Video'];

export async function wipeAllMetadata() {
  const catsSnap = await getDocs(collection(db, 'categories'));
  const formatsSnap = await getDocs(collection(db, 'formats'));
  const batch = writeBatch(db);
  catsSnap.forEach((d) => batch.delete(d.ref));
  formatsSnap.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

export async function seedDefaultMetadata(force = false) {
  if (force) {
    await wipeAllMetadata();
  }
  
  const catsSnap = await getDocs(collection(db, 'categories'));
  const formatsSnap = await getDocs(collection(db, 'formats'));

  const batch = writeBatch(db);

  if (catsSnap.empty) {
    DEFAULT_CATEGORIES.forEach((cat) => {
      const docRef = doc(collection(db, 'categories'));
      batch.set(docRef, { name: cat });
    });
  }

  if (formatsSnap.empty) {
    DEFAULT_FORMATS.forEach((form) => {
      const docRef = doc(collection(db, 'formats'));
      batch.set(docRef, { name: form });
    });
  }

  await batch.commit();
}

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface UseAdminAuthReturn {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Wraps Firebase Auth state.
 * - `loading` is true only during the initial auth check.
 * - `signIn` throws on wrong credentials — catch in the login form.
 */
export function useAdminAuth(): UseAdminAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return { user, loading, signIn, signOut };
}

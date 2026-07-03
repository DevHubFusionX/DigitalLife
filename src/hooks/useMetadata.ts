import { useState, useEffect } from 'react';
import {
  subscribeCategories,
  subscribeFormats,
  type Category,
  type Format,
} from '../lib/firestore/metadata';

export function useMetadata() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formats, setFormats] = useState<Format[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let catsLoaded = false;
    let formatsLoaded = false;

    const checkLoading = () => {
      if (catsLoaded && formatsLoaded) {
        setLoading(false);
      }
    };

    const unsubCats = subscribeCategories((cats) => {
      setCategories(cats);
      catsLoaded = true;
      checkLoading();
    });

    const unsubFormats = subscribeFormats((forms) => {
      setFormats(forms);
      formatsLoaded = true;
      checkLoading();
    });

    return () => {
      unsubCats();
      unsubFormats();
    };
  }, []);

  return { categories, formats, loading };
}

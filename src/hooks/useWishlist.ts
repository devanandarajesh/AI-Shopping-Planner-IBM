import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ai_shopping_wishlist';

function loadWishlist(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    setWishlist(loadWishlist());
  }, []);

  const toggle = useCallback((productId: number) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const has = useCallback(
    (productId: number) => wishlist.includes(productId),
    [wishlist],
  );

  return { wishlist, toggle, has };
}

export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return fallback;
      const item = window.localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item) as T;
    } catch (err) {
      console.warn(`[SafeStorage] Failed reading key "${key}":`, err);
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`[SafeStorage] Failed persisting key "${key}":`, err);
    }
  },

  remove(key: string): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      window.localStorage.removeItem(key);
    } catch (err) {}
  }
};

/**
 * Simple promise-based wrapper around browser IndexedDB API
 * Provides fallback to in-memory/localStorage if IndexedDB is not supported.
 */

const DB_NAME = "AppDatabase";
const DB_VERSION = 1;
const DEFAULT_STORE = "app_store";

function openDB(storeName: string = DEFAULT_STORE): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB is not supported in this environment"));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const indexedDBStorage = {
  async getItem<T>(key: string, storeName: string = DEFAULT_STORE): Promise<T | null> {
    try {
      const db = await openDB(storeName);
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const req = store.get(key);

        req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn(`IndexedDB getItem failed for "${key}":`, err);
      if (typeof window !== "undefined") {
        const fallback = localStorage.getItem(`${storeName}_${key}`);
        return fallback ? JSON.parse(fallback) : null;
      }
      return null;
    }
  },

  async setItem<T>(key: string, value: T, storeName: string = DEFAULT_STORE): Promise<void> {
    try {
      const db = await openDB(storeName);
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.put(value, key);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn(`IndexedDB setItem failed for "${key}":`, err);
      if (typeof window !== "undefined") {
        localStorage.setItem(`${storeName}_${key}`, JSON.stringify(value));
      }
    }
  },

  async removeItem(key: string, storeName: string = DEFAULT_STORE): Promise<void> {
    try {
      const db = await openDB(storeName);
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.delete(key);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn(`IndexedDB removeItem failed for "${key}":`, err);
      if (typeof window !== "undefined") {
        localStorage.removeItem(`${storeName}_${key}`);
      }
    }
  },

  async clear(storeName: string = DEFAULT_STORE): Promise<void> {
    try {
      const db = await openDB(storeName);
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.clear();

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn(`IndexedDB clear failed for "${storeName}":`, err);
    }
  },
};

export default indexedDBStorage;

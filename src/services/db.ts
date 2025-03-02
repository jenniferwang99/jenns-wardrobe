import { Category } from '../types';

export interface WardrobeItem {
  id?: number;
  item_name: string;
  type: Category;
  image_url: string;
  times_worn: number;
  created_at: string;
}

class IndexedDBService {
  private dbName = 'wardrobeDB';
  private version = 1;
  private storeName = 'wardrobe_items';
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('created_at', 'created_at', { unique: false });
        }
      };
    });
  }

  private getStore(mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('Database not initialized');
    const transaction = this.db.transaction(this.storeName, mode);
    return transaction.objectStore(this.storeName);
  }

  async getAllItems(): Promise<WardrobeItem[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const request = store.index('created_at').openCursor(null, 'prev');
      const items: WardrobeItem[] = [];

      request.onerror = () => reject(request.error);
      request.onsuccess = event => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        } else {
          resolve(items);
        }
      };
    });
  }

  async getItemsByCategory(category: Category): Promise<WardrobeItem[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const request = store.index('type').getAll(category);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async addItem(
    item: Omit<WardrobeItem, 'id' | 'times_worn' | 'created_at'>
  ): Promise<WardrobeItem> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const newItem: WardrobeItem = {
        ...item,
        times_worn: 0,
        created_at: new Date().toISOString(),
      };

      const request = store.add(newItem);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const id = request.result as number;
        resolve({ ...newItem, id });
      };
    });
  }

  async updateItem(id: number, updates: Partial<WardrobeItem>): Promise<WardrobeItem> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const item = request.result;
        if (!item) {
          reject(new Error('Item not found'));
          return;
        }

        const updatedItem = {
          ...item,
          ...updates,
        };

        const updateRequest = store.put(updatedItem);
        updateRequest.onerror = () => reject(updateRequest.error);
        updateRequest.onsuccess = () => resolve(updatedItem);
      };
    });
  }

  async deleteItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async incrementTimesWorn(id: number): Promise<WardrobeItem> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const item = request.result;
        if (!item) {
          reject(new Error('Item not found'));
          return;
        }

        const updatedItem = {
          ...item,
          times_worn: item.times_worn + 1,
        };

        const updateRequest = store.put(updatedItem);
        updateRequest.onerror = () => reject(updateRequest.error);
        updateRequest.onsuccess = () => resolve(updatedItem);
      };
    });
  }
}

export const dbService = new IndexedDBService();

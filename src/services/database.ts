import Database from 'better-sqlite3';
import { Category } from '../types';

const db = new Database('wardrobe.db');

// Initialize the database with our table
db.exec(`
  CREATE TABLE IF NOT EXISTS wardrobe_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    type TEXT NOT NULL,
    image_url TEXT NOT NULL,
    times_worn INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface WardrobeItemDB {
  id: number;
  item_name: string;
  type: Category;
  image_url: string;
  times_worn: number;
  created_at: string;
}

export const dbService = {
  // Add a new item
  addItem: (item_name: string, type: Category, image_url: string): WardrobeItemDB => {
    const stmt = db.prepare(
      'INSERT INTO wardrobe_items (item_name, type, image_url) VALUES (?, ?, ?)'
    );
    const result = stmt.run(item_name, type, image_url);

    return {
      id: result.lastInsertRowid as number,
      item_name,
      type,
      image_url,
      times_worn: 0,
      created_at: new Date().toISOString(),
    };
  },

  // Get all items
  getAllItems: (): WardrobeItemDB[] => {
    const stmt = db.prepare('SELECT * FROM wardrobe_items ORDER BY created_at DESC');
    return stmt.all() as WardrobeItemDB[];
  },

  // Get items by category
  getItemsByCategory: (type: Category): WardrobeItemDB[] => {
    const stmt = db.prepare('SELECT * FROM wardrobe_items WHERE type = ? ORDER BY created_at DESC');
    return stmt.all(type) as WardrobeItemDB[];
  },

  // Increment times worn
  incrementTimesWorn: (id: number): void => {
    const stmt = db.prepare('UPDATE wardrobe_items SET times_worn = times_worn + 1 WHERE id = ?');
    stmt.run(id);
  },

  // Delete an item
  deleteItem: (id: number): void => {
    const stmt = db.prepare('DELETE FROM wardrobe_items WHERE id = ?');
    stmt.run(id);
  },

  // Get item by ID
  getItemById: (id: number): WardrobeItemDB | undefined => {
    const stmt = db.prepare('SELECT * FROM wardrobe_items WHERE id = ?');
    return stmt.get(id) as WardrobeItemDB | undefined;
  },

  // Update item details
  updateItem: (id: number, updates: Partial<WardrobeItemDB>): void => {
    console.log('Database updateItem called with:', { id, updates });
    const allowedUpdates = ['item_name', 'type', 'image_url'];
    console.log('Allowed updates:', allowedUpdates);
    const updates_filtered = Object.entries(updates)
      .filter(([key]) => allowedUpdates.includes(key))
      .map(([key, value]) => `${key} = ?`);

    if (updates_filtered.length === 0) return;

    const stmt = db.prepare(`
      UPDATE wardrobe_items 
      SET ${updates_filtered.join(', ')}
      WHERE id = ?
    `);

    stmt.run(
      ...Object.entries(updates)
        .filter(([key]) => allowedUpdates.includes(key))
        .map(([_, value]) => value),
      id
    );
  },
};

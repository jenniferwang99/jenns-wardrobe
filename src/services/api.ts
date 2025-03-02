import { Category } from '../types';
import { dbService, WardrobeItem } from './db';

// Use relative path for both development and production
export const UPLOADS_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/jenns-wardrobe'  // GitHub Pages path
  : '';  // Local development path

export type WardrobeItemResponse = WardrobeItem;

export const apiService = {
  async getAllItems(): Promise<WardrobeItemResponse[]> {
    return dbService.getAllItems();
  },

  async getItemsByCategory(category: string): Promise<WardrobeItemResponse[]> {
    return dbService.getItemsByCategory(category as Category);
  },

  async addItem(formData: FormData): Promise<WardrobeItemResponse> {
    const name = formData.get('name') as string;
    const type = formData.get('category') as Category;
    const imageFile = formData.get('image') as File;

    // Convert the image file to a data URL
    const image_url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(imageFile);
    });

    return dbService.addItem({
      item_name: name,
      type,
      image_url,
    });
  },

  async incrementTimesWorn(id: number): Promise<WardrobeItemResponse> {
    return dbService.incrementTimesWorn(id);
  },

  async deleteItem(id: number): Promise<void> {
    return dbService.deleteItem(id);
  },

  async updateItem(
    id: number,
    updates: { name: string; category: string }
  ): Promise<WardrobeItemResponse> {
    return dbService.updateItem(id, {
      item_name: updates.name,
      type: updates.category as Category,
    });
  },
};

export type Category = 'tops' | 'bottoms' | 'shoes' | 'accessories';

export interface WardrobeItem {
  id: number;
  item_name: string;
  type: Category;
  image_url: string;
  times_worn: number;
  created_at: string;
}

export interface UploadFormData {
  name: string;
  category: Category;
  file: File;
}

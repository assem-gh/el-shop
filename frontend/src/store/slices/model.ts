export interface ProductModel {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  description: string;
}

export interface CategoryModel {
  id: string;
  name: string;
}

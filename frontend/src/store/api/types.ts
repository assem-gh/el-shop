import { CategoryModel, ProductModel } from "../slices/model";

export interface ProductsListResponse {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  products: ProductModel[];
}

export interface CreateCategoryRequest {
  name: string;
}

export type CategoriesListResponse = CategoryModel[];

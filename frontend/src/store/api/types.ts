import { CategoryModel, ProductModel } from "../slices/model";

export interface ProductsListResponse {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  products: ProductModel[];
}

export type CategoriesListResponse = CategoryModel[];

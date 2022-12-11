import { CategoryModel, ProductModel } from "../slices/model";
import { Entity } from "../store";

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

export interface ErrorResponse {
  timestamp: string;
  type: string;
  message: string;
  data: any;
}

export interface DeleteArg {
  id: string;
  entity: Entity;
}
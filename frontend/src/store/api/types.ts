import { ProductModel } from "../slices/model";

export interface ProductsListResponse {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  products: ProductModel[];
}

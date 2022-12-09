import { CategoryModel, ProductModel } from "../store/slices/model";

type RowDataType<T> = Record<string, keyof T>;

interface TableData {
  product: RowDataType<ProductModel>;
  category: RowDataType<CategoryModel>;
}

export const tableData: TableData = {
  product: {
    Product: "images",
    Title: "title",
    Category: "category",
    Price: "price",
    Description: "description",
  },
  category: {
    Name: "name",
  },
};

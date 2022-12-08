import axiosInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductModel } from "../slices/model";
import { CategoriesListResponse, ProductsListResponse } from "./types";

const createNewProduct = createAsyncThunk(
  "products/post",
  async (args: any) => {
    const res = await axiosInstance.post<ProductModel>("/products", args, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("[Create Product thunk]: ", res.data);
    return res.data;
  }
);

const getAllProduct = createAsyncThunk(
  "products/list",
  async ({ page, size }: { page: number; size: number }) => {
    const res = await axiosInstance.get<ProductsListResponse>("/products", {
      params: { page, size },
    });
    return res.data;
  }
);

const getAllCategories = createAsyncThunk("categories/list", async () => {
  const res = await axiosInstance.get<CategoriesListResponse>("/categories");
  return res.data;
});

const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string) => {
    await axiosInstance.delete("/products/" + id);
  }
);

const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string) => {
    await axiosInstance.delete("/categories/" + id);
  }
);

export default {
  createNewProduct,
  getAllProduct,
  getAllCategories,
  deleteProduct,
  deleteCategory,
};

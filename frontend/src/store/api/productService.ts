import axiosInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryModel, ProductModel } from "../slices/model";
import {
  CategoriesListResponse,
  CreateCategoryRequest,
  DeleteArg,
  ProductsListResponse,
} from "./types";

export const createNewProduct = createAsyncThunk(
  "products/add",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<ProductModel>("/products", args, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "products/list",
  async (
    { page, size }: { page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get<ProductsListResponse>("/products", {
        params: { page, size },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "categories/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<CategoriesListResponse>(
        "/categories"
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<void, DeleteArg>(
  "products/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/products/" + id);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (arg: CreateCategoryRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<CategoryModel>("/categories", arg);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteCategory = createAsyncThunk<void, DeleteArg>(
  "categories/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/categories/" + id);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

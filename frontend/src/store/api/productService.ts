import axiosInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductModel } from "../slices/model";
import { ProductsListResponse } from "./types";

const createNewProduct = createAsyncThunk(
  "products/post",
  async (args: any, thunkAPI) => {
    const res = await axiosInstance.post<ProductModel>("/products", args, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("[Create Product thunk]: ", res.data);
    return res.data;
  }
);

const getAllProduct = createAsyncThunk(
  "products/list",
  async ({ page, size }: { page: number; size: number }, thunkAPI) => {
    const res = await axiosInstance.get<ProductsListResponse>("/products", {
      params: { page, size },
    });
    return res.data;
  }
);

export default { createNewProduct, getAllProduct };

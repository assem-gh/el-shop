import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  createNewProduct,
  deleteProduct,
  getAllProduct,
} from "../api/productService";
import { ProductModel } from "./model";
import { RootState } from "../store";

const productAdapter = createEntityAdapter<ProductModel>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const productSlice = createSlice({
  name: "product",

  initialState: productAdapter.getInitialState({
    currentPage: 0,
    hasNext: false,
    totalProducts: 0,
  }),
  reducers: {},

  extraReducers(builder) {
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      productAdapter.addOne(state, action.payload);
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      productAdapter.addMany(state, action.payload.products);
      state.hasNext = action.payload.hasNext;
      state.totalProducts = action.payload.totalProducts;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      productAdapter.removeOne(state, action.meta.arg.id);
    });
  },
});

export const { selectIds: selectProductsId, selectById: selectProductById } =
  productAdapter.getSelectors((state: RootState) => state.product);

export const productReducer = productSlice.reducer;

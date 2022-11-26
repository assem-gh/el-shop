import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import productsAPI from "../api/productService";
import { ProductModel } from "./model";
import { RootState } from "../store";

const productAdapter = createEntityAdapter<ProductModel>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const productSlice = createSlice({
  name: "product",
  initialState: productAdapter.getInitialState(),
  reducers: {},

  extraReducers(builder) {
    builder.addCase(productsAPI.createNewProduct.fulfilled, (state, action) => {
      productAdapter.addOne(state, action.payload);
    });
    builder.addCase(productsAPI.getAllProduct.fulfilled, (state, action) => {
      productAdapter.addMany(state, action.payload.products);
    });
  },
});

export const { selectIds: selectProductsId, selectById: selectProductById } =
  productAdapter.getSelectors((state: RootState) => state.product);

export const productReducer = productSlice.reducer;

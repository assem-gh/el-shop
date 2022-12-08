import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import productsAPI from "../api/productService";
import { RootState } from "../store";
import { CategoryModel } from "./model";

const categoryAdapter = createEntityAdapter<CategoryModel>({
  selectId: (category) => category.id,
});

const categorySlice = createSlice({
  name: "category",

  initialState: categoryAdapter.getInitialState,
  reducers: {},

  extraReducers: function (builder) {
    builder.addCase(productsAPI.getAllCategories.fulfilled, (state, action) => {
      categoryAdapter.setAll(state, action.payload);
    });
  },
});

export const { selectIds: selectCategoryIds, selectById: selectCategoryById } =
  categoryAdapter.getSelectors((state: RootState) => state.category);

export const categoryReducer = categorySlice.reducer;

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../api/productService";
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
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      categoryAdapter.setAll(state, action.payload);
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      categoryAdapter.removeOne(state, action.meta.arg.id);
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      categoryAdapter.addOne(state, action.payload);
    });
  },
});

export const {
  selectIds: selectCategoryIds,
  selectById: selectCategoryById,
  selectAll: selectCategories,
} = categoryAdapter.getSelectors((state: RootState) => state.category);

export const categoryReducer = categorySlice.reducer;

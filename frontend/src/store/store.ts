import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { categoryReducer } from "./slices/categoryslice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
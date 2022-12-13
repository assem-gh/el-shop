import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { categoryReducer } from "./slices/categorySlice";
import { NotificationMiddleware } from "./middleware/notificationMiddleware";

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(NotificationMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Entity = keyof RootState;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
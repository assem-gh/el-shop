import {
  addListener,
  createListenerMiddleware,
  isAnyOf,
  isFulfilled,
  isRejected,
  TypedAddListener,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import {
  addCategory,
  createNewProduct,
  deleteCategory,
  deleteProduct,
} from "../api/productService";
import { ErrorResponse } from "../api/types";
import { createNotification } from "../../components/Notification/createNotification";

export const NotificationMiddleware = createListenerMiddleware({
  onError: (e, errorInfo) => {
    console.log("[Listener Error] => ", errorInfo, e);
  },
});

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  NotificationMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

startAppListening({
  matcher: isAnyOf(
    deleteProduct.rejected,
    deleteProduct.fulfilled,
    deleteCategory.rejected,
    deleteCategory.fulfilled,
    createNewProduct.rejected,
    createNewProduct.fulfilled,
    addCategory.rejected,
    addCategory.fulfilled
  ),
  effect: (action, listenerApi) => {
    if (isRejected(action)) {
      const errorResponse = action.payload as ErrorResponse;
      let errMessage: string;

      if (Array.isArray(errorResponse.data)) {
        errMessage = errorResponse.data.reduce(
          (acc, current) => acc + ", " + current.error,
          ""
        );
      } else {
        errMessage = errorResponse.data.error;
      }

      createNotification(action.type, "error", errMessage);
    }

    if (isFulfilled(action)) {
      createNotification(action.type, "success");
    }
  },
});

import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { gifReducer } from "./reducers/gif-reducer/gifReducer";

export const store = configureStore({
  reducer: {
    gif: gifReducer,
  },

  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { bodyReducer } from "./bodySlice";
import { discsReducer } from "./discsSlice";
import { glassReducer } from "./glassSlice";

export const store = configureStore({
  reducer: {
    glass: glassReducer,
    discs: discsReducer,
    body: bodyReducer,
  },
  middleware: (getDef) => getDef(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

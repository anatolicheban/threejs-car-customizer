import { configureStore } from "@reduxjs/toolkit";
import { bodyReducer } from "./bodySlice";
import { discsReducer } from "./discsSlice";
import { glassReducer } from "./glassSlice";
import { targetReducer } from "./targetSlice";

export const store = configureStore({
  reducer: {
    target: targetReducer,
    body: bodyReducer,
    discs: discsReducer,
    glass: glassReducer,
  },
  middleware: (getDef) => getDef(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

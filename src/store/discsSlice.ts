import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscsState } from "../models/models";

const initialState: DiscsState = {
  color: "#fff",
  metalness: 1,
  roughness: 0.3,
};

export const discsSlice = createSlice({
  name: "discs",
  initialState,
  reducers: {
    changeDiscsColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    changeDiscsMetalness(state, action: PayloadAction<number>) {
      state.metalness = action.payload;
    },
    changeDiscsRoughness(state, action: PayloadAction<number>) {
      state.roughness = action.payload;
    },
  },
});

export const { reducer: discsReducer, actions: discsActions } = discsSlice;

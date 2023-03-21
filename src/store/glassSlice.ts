import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlassState } from "../models/models";

const initialState: GlassState = {
  color: "#fff",
  metalness: 1,
  roughness: 0.3,
};

export const glassSlice = createSlice({
  name: "glass",
  initialState,
  reducers: {
    changeGlassColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    changeGlassMetalness(state, action: PayloadAction<number>) {
      state.metalness = action.payload;
    },
    changeGlassRoughness(state, action: PayloadAction<number>) {
      state.roughness = action.payload;
    },
  },
});

export const { reducer: glassReducer, actions: glassActions } = glassSlice;

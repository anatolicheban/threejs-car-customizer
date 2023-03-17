import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BodyState } from "../models/models";

const initialState: BodyState = {
  color: "#fff",
  metalness: 1,
  roughness: 0.3,
};

export const bodySlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    changeBodyColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    changeBodyMetalness(state, action: PayloadAction<number>) {
      state.metalness = action.payload;
    },
    changeBodyRoughness(state, action: PayloadAction<number>) {
      state.roughness = action.payload;
    },
  },
});

export const { reducer: bodyReducer, actions: bodyActions } = bodySlice;

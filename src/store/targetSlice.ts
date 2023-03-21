import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenTarget, TargetState } from "../models/models";

const initialState: TargetState = {
  current: "body",
};

export const targetSlice = createSlice({
  name: "target",
  initialState,
  reducers: {
    changeTargetColor(state, action: PayloadAction<GenTarget>) {
      state.current = action.payload;
    },
  },
});

export const { reducer: targetReducer, actions: targetActions } = targetSlice;

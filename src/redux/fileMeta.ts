import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Vector2d } from "konva/lib/types";
import { StoreState } from "./store";

const FILE_META_PREFIX = "FILE_META";

export type FileMeta = {
  scale: Vector2d;
  position: Vector2d;
};

const initialFileMeta: FileMeta = {
  scale: {
    x: 1,
    y: 1,
  },
  position: {
    x: 0,
    y: 0,
  },
};

export const fileMetaSlice = createSlice({
  name: FILE_META_PREFIX,
  initialState: initialFileMeta,
  reducers: {
    setFileMeta(state, action) {
      const { scale, position } = action.payload;
      state.scale = scale;
      state.position = position;
    },
  },
});

const fileMetaReducer = fileMetaSlice.reducer;

export const selectFileMeta = (state: StoreState) => state.fileMeta;

export const fileMetaSelector = {
  selectFileMeta,
  selectScale: createSelector(selectFileMeta, (fileMeta) => fileMeta.scale),
  selectPosition: createSelector(selectFileMeta, (fileMeta) => fileMeta.position),
};
export const fileMetaAction = fileMetaSlice.actions;
export default fileMetaReducer;

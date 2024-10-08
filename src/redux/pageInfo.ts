import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RefObject } from "react";
import { StoreState } from "./store";

export const PAGE_INFO = "PAGE_INFO";

export type PageInfo = {
  id: string;
  reference: RefObject<any | null>;
};

export const pageInfoEntity = createEntityAdapter<PageInfo>();

export const pageInfoSlice = createSlice({
  name: PAGE_INFO,
  initialState: pageInfoEntity.setAll(pageInfoEntity.getInitialState(), []),
  reducers: {
    addItem(state, action) {
      if (Array.isArray(action.payload)) {
        pageInfoEntity.addMany(state, action.payload);
        return;
      }
      pageInfoEntity.addOne(state, action.payload);
    },
    updateItem(state, action: PayloadAction<PageInfo | PageInfo[]>) {
      if (Array.isArray(action.payload)) {
        pageInfoEntity.updateMany(
          state,
          action.payload.map((item) => ({
            id: item.id,
            changes: item,
          }))
        );
        return;
      }
      pageInfoEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    removeItem(state, action) {
      if (Array.isArray(action.payload)) {
        pageInfoEntity.removeMany(state, action.payload);
        return;
      }
      pageInfoEntity.removeOne(state, action.payload.id);
    },
    clearItems(state, action) {
      pageInfoEntity.removeAll(state);
    },
  },
});

const pageInfoReducer = pageInfoSlice.reducer;

export const pageInfoSelectors = pageInfoEntity.getSelectors(
  (state: StoreState) => state.pageInfoCollection
);
export const pageInfoAction = pageInfoSlice.actions;
export default pageInfoReducer;

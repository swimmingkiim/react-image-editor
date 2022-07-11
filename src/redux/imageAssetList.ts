import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { take, tap } from "rxjs";
import { StoreState } from "./store";

export const IMAGE_ASSET_LIST_PREFIX = "IMAGE_ASSET_LIST";

export type ImageAssetListItem = {
  type: string;
  id: string;
  name: string;
  src: string;
};

export const imageAssetListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(imageAssetListAction.addItem.type),
    take(1),
    tap((action$) => console.log(action$.payload)),
  );

export const imageAssetListEntity = createEntityAdapter<ImageAssetListItem>();

export const imageAssetListSlice = createSlice({
  name: IMAGE_ASSET_LIST_PREFIX,
  initialState: imageAssetListEntity.setAll(imageAssetListEntity.getInitialState(), []),
  reducers: {
    initialize(state, action) {
      imageAssetListEntity.setAll(state, action.payload);
    },
    addItem(state, action) {
      if (Array.isArray(action.payload)) {
        imageAssetListEntity.addMany(state, action.payload);
        return;
      }
      imageAssetListEntity.addOne(state, action.payload);
    },
    updateItem(state, action: PayloadAction<ImageAssetListItem>) {
      imageAssetListEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    removeItem(state, action) {
      if (Array.isArray(action.payload)) {
        imageAssetListEntity.removeMany(state, action.payload);
        return;
      }
      imageAssetListEntity.removeOne(state, action.payload);
    },
  },
});

const imageAssetListReducer = imageAssetListSlice.reducer;

export const imageAssetListSelector = imageAssetListEntity.getSelectors(
  (state: StoreState) => state.imageAssetList,
);
export const imageAssetListAction = imageAssetListSlice.actions;
export default imageAssetListReducer;

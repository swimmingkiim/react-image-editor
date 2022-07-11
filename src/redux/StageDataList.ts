import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { take, tap } from "rxjs";
import { StageData } from "./currentStageData";
import { StoreState } from "./store";

export const STAGE_LIST_PREFIX = "STAGE_LIST";

export type StageDataListItem = {
  id: string;
  data: StageData[];
};

export const stageDataListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(stageDataListAction.addItem.type),
    take(1),
    tap((action$) => console.log(action$.payload)),
  );

export const stageDataListEntity = createEntityAdapter<StageDataListItem>();

export const stageDataListSlice = createSlice({
  name: STAGE_LIST_PREFIX,
  initialState: stageDataListEntity.setAll(stageDataListEntity.getInitialState(), []),
  reducers: {
    initialize(state, action) {
      stageDataListEntity.setAll(state, action.payload);
    },
    addItem(state, action) {
      if (Array.isArray(action.payload)) {
        stageDataListEntity.addMany(state, action.payload);
        return;
      }
      stageDataListEntity.addOne(state, action.payload);
    },
    updateItem(state, action: PayloadAction<StageDataListItem>) {
      stageDataListEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    removeItem(state, action) {
      if (Array.isArray(action.payload)) {
        stageDataListEntity.removeMany(state, action.payload);
        return;
      }
      stageDataListEntity.removeOne(state, action.payload);
    },
  },
});

const stageDataListReducer = stageDataListSlice.reducer;

export const stageDataListSelector = stageDataListEntity.getSelectors(
  (state: StoreState) => state.stageDataList,
);
export const stageDataListAction = stageDataListSlice.actions;
export default stageDataListReducer;

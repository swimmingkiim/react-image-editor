import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "./store";

export const WORKSPACE_COLOR = "WORKSPACE_COLOR";

export interface WorkspaceColorState {
    id: number;
    value: string;
}

const workspaceColorEntity = createEntityAdapter<WorkspaceColorState>();

const workspaceColorSlice = createSlice({
    name: WORKSPACE_COLOR,
    initialState: workspaceColorEntity.setAll(workspaceColorEntity.getInitialState(), [{id: 0, value: '#fff'}]),
    reducers: {
        changeColor(state, action) {
            workspaceColorEntity.updateOne(state, action);
        }
    }
});

export const workspaceColorActions = workspaceColorSlice.actions;
export const workspaceColorSelector = workspaceColorEntity.getSelectors(
    (state: StoreState) => state.workspaceColor,
  );
export default workspaceColorSlice.reducer;
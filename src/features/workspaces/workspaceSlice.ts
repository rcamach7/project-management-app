import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workspace } from 'models/client.models';
import { RootState } from '@/features/store';

interface WorkspaceState {
  value: Workspace[];
}

const initialState: WorkspaceState = {
  value: [],
};

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setWorkspaces } = workspaceSlice.actions;
export const workspacesReducer = workspaceSlice.reducer;
export const selectWorkspaces = (state: RootState) => state.workspaces.value;

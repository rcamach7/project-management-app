import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workspace } from 'models/client';
import { RootState } from '@/features/store';

interface WorkspaceState {
  value: Workspace[];
  loading: boolean;
}

const initialState: WorkspaceState = {
  value: [],
  loading: true,
};

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setWorkspaces: (
      state,
      action: PayloadAction<{ workspaces: Workspace[]; loading: boolean }>
    ) => {
      state.value = action.payload.workspaces;
      state.loading = action.payload.loading;
    },
  },
});

export const { setWorkspaces } = workspaceSlice.actions;
export const workspacesReducer = workspaceSlice.reducer;
export const selectWorkspaces = (state: RootState) => state.workspaces.value;

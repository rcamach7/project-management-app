import { configureStore } from '@reduxjs/toolkit';
import {
  workspacesReducer,
  setWorkspaces,
} from '@/features/workspaces/workspaceSlice';
import { Workspace } from 'models/client.models';
import axios from 'axios';

const store = configureStore({
  reducer: { workspaces: workspacesReducer },
});

const initialUserWorkspacesFetch = async (dispatch) => {
  try {
    const workspaces = await axios.get('/api/workspace');
    const { data }: { data: Workspace[] } = workspaces;
    dispatch(setWorkspaces({ workspaces: data, loading: false }));
  } catch {
    console.error("Error fetching user's workspaces");
  }
};
store.dispatch(initialUserWorkspacesFetch);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

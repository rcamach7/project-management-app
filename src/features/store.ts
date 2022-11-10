import { configureStore } from '@reduxjs/toolkit';
import { workspacesReducer } from '@/features/workspaces/workspaceSlice';

const store = configureStore({
  reducer: { workspaces: workspacesReducer },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

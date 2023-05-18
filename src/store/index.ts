import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import loginReducer from './reducers/login';
import searchReducer from './reducers/search';

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    search: searchReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

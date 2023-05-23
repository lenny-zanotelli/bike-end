import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './reducers/favorite';
import loginReducer from './reducers/login';
import searchReducer from './reducers/search';

const store = configureStore({
  reducer: {
    login: loginReducer,
    search: searchReducer,
    favorite: favoriteReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

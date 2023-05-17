import { createAsyncThunk, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';

interface UserState {
  firstname: string;
  lastname: string;
  email: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  firstname: '',
  lastname: '',
  email: '',
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axiosInstance.get('/user');
  console.log(response.data);
  return response.data;
});

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserState>) => {
      state.loading = false;
      state.error = null;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default userReducer;

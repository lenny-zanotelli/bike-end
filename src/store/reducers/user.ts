import { createAsyncThunk, PayloadAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

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
  const tokenWithQuotes = localStorage.getItem('token');
  if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('http://localhost:3000/user', { headers });
      const userData = response.data;
      return userData;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Pas de TOKEN');
  }
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

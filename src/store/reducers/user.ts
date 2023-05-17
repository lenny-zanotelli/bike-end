import { createAsyncThunk, PayloadAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeUserDataFromLocalStorage } from '../../utils/login';

interface UserState {
  user: UserState | null;
  firstname: string;
  lastname: string;
  email: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
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

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  const tokenWithQuotes = localStorage.getItem('token');
  if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete('http://localhost:3000/user', { headers });
    } catch (error) {
      console.log(error);
    }
  }
});

const userReducer = createReducer(initialState, (builder) => {
  builder
    // REQUEST USER
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
    })
  // DELETE USER
    .addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      removeUserDataFromLocalStorage();
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Une erreur est survenue';
    });
});

export default userReducer;

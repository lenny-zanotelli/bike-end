import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';

interface UserState {
  firstname: string;
  lastname: string;
  email: string;
  loading: boolean;
  error: string | null;
  logged: boolean;
}

const initialState: UserState = {
  firstname: '',
  lastname: '',
  email: '',
  loading: false,
  error: null,
  logged: false,
};

// eslint-disable-next-line consistent-return
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const tokenWithQuotes = localStorage.getItem('token');
  if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('https://bikeend-api.up.railway.app/user', { headers });
      const userData = response.data;
      console.log(response);
      return userData;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Pas de TOKEN');
  }
});

// eslint-disable-next-line consistent-return
export const modifyUser = createAppAsyncThunk('login/modifyUser', async (_, thunkAPI) => {
  const tokenWithQuotes = localStorage.getItem('token');
  const state = thunkAPI.getState();
  const {
    firstname, lastname, email,
  } = state.login.credentials;
  if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.patch('https://bikeend-api.up.railway.app/user', {
        firstname,
        lastname,
        email,
      }, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
});
// MONINTERFACE['propriété'] permet de récupérer le typage d'un propriété.
// 'type' me permet de créer un type comme 'interface'
// Car 'interface' est obligatoirement un objet
// Donc avec 'type' cela peut être une ou des valeurs.
export type KeysOfCredentials = keyof UserState[];

export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string;
}>('user/CHANGE_CREDENTIALS_FIELD');

const userReducer = createReducer(initialState, (builder) => {
  builder
    // REQUEST USER
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
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
    .addCase(modifyUser.fulfilled, (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
    });
});

export default userReducer;

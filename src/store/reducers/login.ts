import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { getUserDataFromLocalStorage } from '../../utils/login';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/login';

interface LoginStates {
  credentials: {
    email: string
    password: string
  },
  isLoading: boolean
  error: string | null
  token: string;
}

// Récupération de données dans le localStorage
const userData = getUserDataFromLocalStorage();

const initialState: LoginStates = {
  credentials: {
    email: '',
    password: '',
  },
  isLoading: false,
  error: null,
  token: '',
  ...userData,
};

// MONINTERFACE['propriété'] permet de récupérer le typage d'un propriété.
// 'type' me permet de créer un type comme 'interface'
// Car 'interface' est obligatoirement un objet
// Donc avec 'type' cela peut être une ou des valeurs.
export type KeysOfCredentials = keyof LoginStates['credentials'];

export const login = createAppAsyncThunk(
  'login/LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const { email, password } = state.login.credentials;
    const { data } = await axiosInstance.post('/login', {
      email,
      password,
    });
    localStorage.setItem('login', JSON.stringify(data));
    return data as LoginResponse;
  },

);

export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string
}>('login/CHANGE_CREDENTIALS_FIELD');

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      state.credentials[action.payload.propertyKey] = action.payload.value;
    })
    .addCase(login.rejected, (state) => {
      state.error = 'Mauvais Identifiants';
      state.isLoading = false;
    })
    .addCase(login.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      // Réinitialiser le state des credentials
      state.credentials.email = '';
      state.credentials.password = '';
    });
});

export default loginReducer;

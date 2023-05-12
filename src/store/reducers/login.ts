import { createAction, createReducer } from '@reduxjs/toolkit';

interface LoginStates {
  credentials: {
    email: string
    password: string
  },
  isLoading: boolean
  error: string | null
}
const initialState: LoginStates = {
  credentials: {
    email: '',
    password: '',
  },
  isLoading: false,
  error: null,
};

export type KeysOfCredentials = keyof LoginStates['credentials'];

export const login = createAction('login/LOGIN');

export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string
}>('login/CHANGE_CREDENTIALS_FIELD');

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      state.credentials[action.payload.propertyKey] = action.payload.value;
    })
    .addCase(login, (state) => {
      state.error = null;
      state.isLoading = true;
    })
    .addCase(login, (state) => {
      state.isLoading = false;
      state.error = 'Mauvais Identifiants';
    })
    .addCase(login, (state) => {
      state.isLoading = false;
    });
});

export default loginReducer;

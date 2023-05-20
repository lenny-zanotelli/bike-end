import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/login';
import { axiosInstance } from '../../utils/axios';

interface LoginStates {
  logged: boolean;
  credentials: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordCheck: string;
  },
  acceptedConditions: boolean;
  isLoading: boolean;
  error: string | null;
  token: string;
}

// Récupération de données dans le localStorage
const userData = getUserDataFromLocalStorage();
const savedToken = localStorage.getItem('token');

const initialState: LoginStates = {
  logged: false,
  credentials: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordCheck: '',
  },
  acceptedConditions: false,
  isLoading: false,
  error: null,
  token: savedToken || '',
  ...userData,
};

// MONINTERFACE['propriété'] permet de récupérer le typage d'un propriété.
// 'type' me permet de créer un type comme 'interface'
// Car 'interface' est obligatoirement un objet
// Donc avec 'type' cela peut être une ou des valeurs.
export type KeysOfCredentials = keyof LoginStates['credentials'];
export const toggleAcceptedConditions = createAction('login/ACCEPTED_CONDITIONS');

export const login = createAppAsyncThunk(
  'login/LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { email, password } = state.login.credentials;
    const { data } = await axiosInstance.post('/login', {
      email,
      password,
    });
    localStorage.setItem('token', JSON.stringify(data));
    return data;
  },
);

export const register = createAppAsyncThunk(
  'login/REGISTER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    // const body = JSON.stringify(newUser);
    const {
      firstname, lastname, email, password,
    } = state.login.credentials;
    const { acceptedConditions } = state.login;
    const { data } = await axiosInstance.post('/signup', {
      firstname,
      lastname,
      email,
      password,
      acceptedConditions,
    });
    localStorage.setItem('token', JSON.stringify(data));
    return data;
  },
);

export const deleteUser = createAppAsyncThunk('login/deleteUser', async () => {
  const tokenWithQuotes = localStorage.getItem('token');
  if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete('https://bikeend-api.up.railway.app/user', { headers });
    } catch (error) {
      console.log(error);
    }
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

// eslint-disable-next-line consistent-return
export const fetchUser = createAppAsyncThunk('user/fetchUser', async () => {
  const tokenWithQuotes = localStorage.getItem('token');
  if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('https://bikeend-api.up.railway.app/user', { headers });
      const res = response.data;
      console.log(response);
      return res;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Pas de TOKEN');
  }
});

export const logout = createAction('login/LOGOUT');

export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string;
}>('login/CHANGE_CREDENTIALS_FIELD');

export const updateLoginStatus = createAction<boolean>('login/UPDATE_LOGIN_STATUS');

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateLoginStatus, (state, action) => {
      state.logged = action.payload;
    })
    .addCase(toggleAcceptedConditions, (state) => {
      state.acceptedConditions = !state.acceptedConditions;
    })
    .addCase(changeCredentialsField, (state, action) => {
      state.credentials[action.payload.propertyKey] = action.payload.value;
    })
    .addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.credentials.firstname = action.payload.firstname;
      state.credentials.lastname = action.payload.lastname;
      state.credentials.email = action.payload.email;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
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
      state.logged = true;
      state.isLoading = false;
      state.token = action.payload.token;
      // Réinitialiser le state des credentials
      state.credentials.email = '';
      state.credentials.password = '';
    })
    // SIGNUP
    .addCase(register.rejected, (state) => {
      state.error = 'Il manque des trucs';
      state.logged = false;
      state.isLoading = false;
    })
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.logged = true;
      state.isLoading = false;
      state.acceptedConditions = true;
      state.token = action.payload.token;
      // Réinitialiser le state des credentials
      state.credentials.email = '';
      state.credentials.password = '';
      state.credentials.passwordCheck = '';
    })
    // LOGGOUT
    .addCase(logout, (state) => {
      state.logged = false;
      removeUserDataFromLocalStorage();
    })
  // DELETE USER
    .addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled, (state) => {
      state.logged = false;
      state.isLoading = false;
      state.error = null;
      removeUserDataFromLocalStorage();
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Une erreur est survenue';
    })
  // MODIFY USER
    .addCase(modifyUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(modifyUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.credentials.firstname = action.payload.firstname;
      state.credentials.lastname = action.payload.lastname;
      state.credentials.email = action.payload.email;
    })
    .addCase(modifyUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
});

export default loginReducer;

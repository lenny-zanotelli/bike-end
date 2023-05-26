import { createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';

export interface Query {
  id: string;
  name: string;
}

interface AutoCompleteState {
  query: Query[];
  error: string | null;
  loading: boolean;
}

const initialState: AutoCompleteState = {
  query: [],
  error: null,
  loading: false,
};

export const fetchAutoComplete = createAppAsyncThunk('autoComplete/FETCH_AUTOCOMPLETE', async (input: string) => {
 
  const tokenWithQuotes = localStorage.getItem('token');
  if (!input) {
    console.log('PAS DE REQUETE YA TCHI');
  } else if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`https://bikeend-api.up.railway.app/autocomplete/${input}`, { headers });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Pas de TOKEN');
  }
  return [];
});

const autoCompleteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAutoComplete.pending, (state) => {
      state.loading = true;
      state.query = initialState.query;
    })
    .addCase(fetchAutoComplete.fulfilled, (state, action) => {
      state.query = action.payload;
      state.loading = false;
    })
    .addCase(fetchAutoComplete.rejected, (state, action) => {
      state.error = action.error.message || 'NUL';
      state.loading = false;
    });
});

export default autoCompleteReducer;

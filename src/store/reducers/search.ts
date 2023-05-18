import { createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';

export interface Query {
  id: string;
  name: string;
}

interface SearchState {
  query: Query[];
  error: string | null;
}

const initialState: SearchState = {
  query: [],
  error: null,
};

// eslint-disable-next-line consistent-return
export const fetchResult = createAppAsyncThunk('search/fetchResult', async (input: string) => {
  const tokenWithQuotes = localStorage.getItem('token');
  if (!input) {
    console.log('PAS DE REQUETE YA TCHI');
  } else if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`https://bikeend-api.up.railway.app/search/${input}`, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Pas de TOKEN');
  }
});

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchResult.fulfilled, (state, action) => {
      state.query = action.payload;
    })
    .addCase(fetchResult.pending, (state, action) => {
      state.query = initialState.query;
    })
    .addCase(fetchResult.rejected, (state, action) => {
      state.error = action.error.message || 'NUL';
    });
});

export default searchReducer;

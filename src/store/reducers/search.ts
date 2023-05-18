import { createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';

export interface Query {
  id: string;
  name: string;
}

interface SearchState {
  query: Query[];
}

const initialState: SearchState = {
  query: [],
};

export const fetchResult = createAppAsyncThunk('search/fetchResult', async () => {
  const tokenWithQuotes = localStorage.getItem('token');
  if (tokenWithQuotes) {
    try {
      const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('https://bikeend-api.up.railway.app/search/Nantes', { headers });
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
    });
});

export default searchReducer;

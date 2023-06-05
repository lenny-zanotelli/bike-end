import { createReducer } from '@reduxjs/toolkit';
import { axiosInstance as axios } from '../../utils/axios';
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
  if (input) {
    try {
      const response = await axios.get(`/autocomplete/${input}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
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

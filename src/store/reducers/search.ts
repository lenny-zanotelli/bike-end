import { createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';
import { Journey } from '../../@types/journey';

interface JourneySearchParams {
  from: string;
  datetime: string;
  max_duration: number;
}

export interface Query {
  id: string;
  name: string;
}

interface SearchState {
  query: Query[];
  params: JourneySearchParams;
  journeys: Journey[];
  error: string | null;
  loading: boolean;
}

const initialState: SearchState = {
  query: [],
  params: {
    from: '',
    datetime: '',
    max_duration: 3600,
  },
  journeys: [],
  error: null,
  loading: false,
};

export const fetchAutoComplete = createAppAsyncThunk('search/fetchAutoComplete', async (input: string) => {
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

export const searchJourneys = createAppAsyncThunk<
Journey[],
JourneySearchParams>(
  'search/SEARCH_JOURNEYS',
  async (params) => {
    const tokenWithQuotesTest = localStorage.getItem('token');
    if (tokenWithQuotesTest) {
      try {
        const token = tokenWithQuotesTest.replace(/^"(.*)"$/, '$1');
        const queryParams = new URLSearchParams(`from=${params.from}&max_duration=${params.max_duration}&per_page=10&current_page=1`);
        const url = `journey/search?${queryParams.toString()}`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`https://bikeend-api.up.railway.app/${url}`, { headers });
        console.log('DESTINATION: ', response);
        return response.data as Journey[];

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Pas de TOKEN');
    }
    return [];
  },
);

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAutoComplete.fulfilled, (state, action) => {
      state.query = action.payload;
    })
    .addCase(fetchAutoComplete.pending, (state) => {
      state.loading = true;
      state.query = initialState.query;
    })
    .addCase(fetchAutoComplete.rejected, (state, action) => {
      state.error = action.error.message || 'NUL';
    })
    .addCase(searchJourneys.pending, (state) => {
      state.loading = true;

      state.error = null;
    })
    .addCase(searchJourneys.fulfilled, (state, action) => {
      state.journeys = action.payload;
    })
    .addCase(searchJourneys.rejected, (state, action) => {
      state.error = action.error.message || 'NUL';
    });
});

export default searchReducer;

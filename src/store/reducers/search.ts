import { createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';

interface JourneySearchParams {
  from: string;
  datetime: string;
  max_duration: number;
}

interface Journey {
  departure_date_time: string;
  duration: number;
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
  nb_transfers: number;
  queryUrl: string;
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
};

// eslint-disable-next-line consistent-return
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Pas de TOKEN');
  }
});

export const searchJourneys = createAppAsyncThunk<
Journey[],
JourneySearchParams>(
  'search/SEARCH_JOURNEYS',
  // eslint-disable-next-line consistent-return
  async (params) => {
    const tokenWithQuotesTest = localStorage.getItem('token');
    if (tokenWithQuotesTest) {
      try {
        const token = tokenWithQuotesTest.replace(/^"(.*)"$/, '$1');
        const queryParams = new URLSearchParams(`from=${params.from}&max_duration=${params.max_duration}`);
        const url = `journey/search?${queryParams.toString()}`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`https://bikeend-api.up.railway.app/${url}`, { headers });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Pas de TOKEN');
    }
  },
);

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAutoComplete.fulfilled, (state, action) => {
      state.query = action.payload;
    })
    .addCase(fetchAutoComplete.pending, (state) => {
      state.query = initialState.query;
    })
    .addCase(fetchAutoComplete.rejected, (state, action) => {
      state.error = action.error.message || 'NUL';
    })
    .addCase(searchJourneys.pending, (state) => {
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

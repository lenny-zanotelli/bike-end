import { createReducer } from '@reduxjs/toolkit';
import { axiosInstance as axios } from '../../utils/axios';
import { createAppAsyncThunk } from '../../utils/redux';
import { Journey } from '../../@types/journey';

interface JourneySearchParams {
  from: string;
  datetime: string;
  max_duration: number;
}

interface SearchState {
  params: JourneySearchParams;
  journeys: Journey[];
  error: string | null;
  loading: boolean;
}

const initialState: SearchState = {
  params: {
    from: '',
    datetime: '',
    max_duration: 3600,
  },
  journeys: [],
  error: null,
  loading: false,
};

export const searchJourneys = createAppAsyncThunk<
Journey[],
JourneySearchParams>(
  'search/SEARCH_JOURNEYS',
  async (params) => {
    try {
      const queryParams = new URLSearchParams(`from=${params.from}&max_duration=${params.max_duration}&per_page=10&current_page=1`);
      const endpoint = `/journey/search?${queryParams.toString()}`;
      const response = await axios.get(endpoint);
      console.log('DESTINATION: ', response);
      return response.data as Journey[];
    } catch (error) {
      console.log(error);
    }

    return [];
  },
);

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(searchJourneys.pending, (state) => {
      state.loading = true;

      state.error = null;
    })
    .addCase(searchJourneys.fulfilled, (state, action) => {
      state.journeys = action.payload;
      state.loading = false;
    })
    .addCase(searchJourneys.rejected, (state, action) => {
      state.error = action.error.message || 'NUL';
      state.loading = false;
    });
});

export default searchReducer;

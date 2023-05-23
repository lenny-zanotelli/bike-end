import { createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { Journey } from '../../@types/journey';

interface FavoriteState {
  favorite: Journey | null;
  sendingFavorite: boolean;
  sendFavoriteError: string | null;
}

const initialState = {
  favorite: null,
  sendingFavorite: false,
  sendFavoriteError: null,
};

export const SET_FAVORITE_CARD = 'SET_FAVORITE_CARD';

export const setFavoriteCard = (card: any) => ({
  type: SET_FAVORITE_CARD,
  payload: card,
});

export const sendFavoriteCard = createAppAsyncThunk(
  'cards/sendFavoriteCard',
  async (card, thunkAPI) => {
    const tokenWithQuotes = localStorage.getItem('token');
    if (tokenWithQuotes) {
      try {
        const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post('https://bikeend-api.up.railway.app/favorite', card, { headers });
        return response.data;
      } catch (error) {
      // Gérez les erreurs et renvoyez-les si nécessaire
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  },
);

const favoriteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(sendFavoriteCard.pending, (state) => {
      state.sendingFavorite = true;
      state.sendFavoriteError = null;
    })
    .addCase(sendFavoriteCard.fulfilled, (state) => {
      state.sendingFavorite = false;
    })
    .addCase(sendFavoriteCard.rejected, (state, action) => {
      state.sendingFavorite = false;
      state.sendFavoriteError = action.payload.error;
    });
});

export default favoriteReducer;

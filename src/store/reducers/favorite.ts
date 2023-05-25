/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';
import { Journey } from '../../@types/journey';

const initialState = {
  favorite: [] as Journey[],
  sendingFavorite: false,
  sendFavoriteError: null,
};

export const SET_FAVORITE_CARD = 'SET_FAVORITE_CARD';
export const REMOVE_FAVORITE_CARD = 'REMOVE_FAVORITE_CARD';
export const FETCH_FAVORITE = 'FETCH_FAVORITE';

export const setFavoriteCard = (card: Journey) => ({
  type: SET_FAVORITE_CARD,
  payload: card,
});

export const getFavorite = (favorites: Journey) => ({
  type: FETCH_FAVORITE,
  payload: favorites,
});

// ADD FAVORITE

export const sendFavoriteCard = createAppAsyncThunk(
  'favorite/sendFavoriteCard',
  async (card: Journey) => {
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
        console.log(error);
      }
    }
  },
);

// GET ALL FAVORITE

export const getAllFavorite = createAppAsyncThunk(
  'favorite/getAllFavorite',
  async () => {
    const tokenWithQuotes = localStorage.getItem('token');
    if (tokenWithQuotes) {
      try {
        const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get('https://bikeend-api.up.railway.app/favorite', { headers });
        const favorites = response.data;
        localStorage.setItem('favorites', JSON.stringify(favorites));

        return favorites;
      } catch (error) {
        console.log(error);
      }
    }
  },
);

// REMOVE FAVORITE

export const removeFavoriteCard = createAppAsyncThunk(
  'favorite/removeFavoriteCard',
  async (cardId: string) => {
    const tokenWithQuotes = localStorage.getItem('token');
    if (tokenWithQuotes) {
      try {
        const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        await axios.delete(`https://bikeend-api.up.railway.app/favorite${cardId}`, { headers });
        console.log(cardId);
      } catch (error) {
        console.log(error);
      }
    }
  },
);

const favoriteReducer = createReducer(initialState, (builder) => {
  builder

  // ADD FAVORITE
    .addCase(sendFavoriteCard.pending, (state) => {
      state.sendingFavorite = true;
      state.sendFavoriteError = null;
    })
    .addCase(sendFavoriteCard.fulfilled, (state, action) => {
      state.sendingFavorite = false;
      state.favorite = action.payload;
    })
    .addCase(sendFavoriteCard.rejected, (state) => {
      state.sendingFavorite = false;
    })
    // REMOVE FAVORITE
    .addCase(removeFavoriteCard.pending, (state) => {
      state.sendingFavorite = true;
      state.sendFavoriteError = null;
    })
    .addCase(removeFavoriteCard.fulfilled, (state) => {
      state.sendingFavorite = false;
    })
    .addCase(removeFavoriteCard.rejected, (state) => {
      state.sendingFavorite = false;
    })
    // GET FAVORITE
    .addCase(getAllFavorite.fulfilled, (state, action) => {
      state.favorite = action.payload;
    });
});

export default favoriteReducer;

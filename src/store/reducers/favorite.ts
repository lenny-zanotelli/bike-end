import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';
import { Journey } from '../../@types/journey';

interface FavoriteState {
  favorite: Journey[];
  sendingFavorite: boolean;
  sendFavoriteError: string | null;
  alert: {
    open: boolean;
    severity: string;
    message: string;
  }
}

const initialState:FavoriteState = {
  favorite: [],
  sendingFavorite: false,
  sendFavoriteError: null,
  alert: {
    open: false,
    severity: 'success',
    message: '',
  },
};

export const setFavoriteCard = createAction<Journey>('favorite/SET_FAVORITE_CARD');
export const getFavoriteCard = createAction<Journey>('favorite/FETCH_FAVORITE');

// ADD FAVORITE
export const sendFavoriteCard = createAppAsyncThunk(
  'favorite/SEND_FAVORITE_CARD',
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
    } else {
      console.log('Pas de Token');
    }
    return [];
  },
);

// GET ALL FAVORITE
export const getAllFavorite = createAppAsyncThunk(
  'favorite/GET_ALL_FAVORITE',
  // eslint-disable-next-line consistent-return
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
    } else {
      console.log('PAS DE TOKEN');
    }
  },
);

// REMOVE FAVORITE
export const removeFavoriteCard = createAppAsyncThunk(
  'favorite/REMOVE_FAVORITE_CARD',
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

export const updateFavoriteComment = createAppAsyncThunk(
  'favorite/UPDATE_FAVORITE_COMMENT',
  // eslint-disable-next-line consistent-return
  async ({ queryUrl, comment }: { queryUrl: string, comment: string }) => {
    const tokenWithQuotes = localStorage.getItem('token');
    if (tokenWithQuotes) {
      try {
        const token = tokenWithQuotes.replace(/^"(.*)"$/, '$1');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.patch(`https://bikeend-api.up.railway.app/favorite/${queryUrl}`, { comment }, { headers });
        console.log(queryUrl, comment);
        return { queryUrl, comment };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
);

export const setDisplaySnackbar = createAction<{
  severity: string; message: string
}>('login/SET_DISPLAY_SNACKBAR');

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
    })
    // UPDATE FAVORITE
    .addCase(updateFavoriteComment.fulfilled, (state, action) => {
      const { queryUrl, comment } = action.payload || {};
      if (queryUrl && comment) {
        state.favorite = state.favorite.map((fav) => {
          if (fav.queryUrl === queryUrl) {
            return { ...fav, comment };
          }
          return fav;
        });
      }
    })
    .addCase(setDisplaySnackbar, (state, action) => {
      state.alert.severity = action.payload ? action.payload.severity : state.alert.severity;
      state.alert.message = action.payload ? action.payload.message : '';
      state.alert.open = true;
    });
});

export default favoriteReducer;

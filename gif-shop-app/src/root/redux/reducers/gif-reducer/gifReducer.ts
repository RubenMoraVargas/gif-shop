import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../../store";

import { Gif } from "../types/gif";

import { fetchGifs } from "../api/giphy";

interface GifState {
  gifs: Gif[];
}

const initialState: GifState = {
  gifs: [],
};

export const gifSlice = createSlice({
  name: "gif",

  initialState,

  reducers: {
    setGifs: (state, action: PayloadAction<Gif[]>) => {
      state.gifs = action.payload;
    },
  },
});

export const { setGifs } = gifSlice.actions;

export const fetchGifsAsync = (searchTerm: string) => {
  return async (dispatch: AppDispatch) => {
    const gifs = await fetchGifs(searchTerm);

    dispatch(setGifs(gifs));
  };
};

export const selectGifs = (state: RootState) => state.gif.gifs;

export const gifReducer = gifSlice.reducer;

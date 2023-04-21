import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Gif } from "@/root/types/Gif.type";
 
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


export const selectGifs = (state: RootState) => state.gif.gifs;

export const gifReducer = gifSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  setSelectedSong: null,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  genreListId: '',
  volume: 0.3,
  repeat: false,
  shuffle: false
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      state.currentSongs = action.payload.data;
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      state.currentIndex = action.payload;
      state.activeSong = state.currentSongs[action.payload];
      state.isActive = true;
    },

    prevSong: (state, action) => {
      state.currentIndex = action.payload;
      state.activeSong = state.currentSongs[action.payload];
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },

    setSelectedSong: (state, action) => { 
      state.selectedSong = action.payload;
    },

    resetPlayer: () => initialState
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
  resetPlayer,
  setSelectedSong 
} = playerSlice.actions;

export default playerSlice.reducer;
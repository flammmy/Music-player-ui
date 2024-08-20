import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  currentSong: null,
  selectedSongId: null,
  isPlaying: true,
  isMuted: false,
  currentIndex: 0,
  progress: 0,
  cover:null
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSongs(state, action) {
      state.songs = action.payload;
    },
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    setSelectedSongId(state, action) {
      state.selectedSongId = action.payload;
    },
    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying(state,action){
      state.isPlaying = action.payload;
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted;
    },
    setProgress(state, action) {
      state.progress = action.payload;
    },
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload;
    },
    setCover(state,action){
      state.cover = action.payload;
    }
  },
});

export const {
  setSongs,
  setCurrentSong,
  setSelectedSongId,
  togglePlayPause,
  toggleMute,
  setProgress,
  setCurrentIndex,
  setIsPlaying,
  setCover
} = songSlice.actions;

export default songSlice.reducer;

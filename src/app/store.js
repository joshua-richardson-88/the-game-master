import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/GameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});

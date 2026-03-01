// store/index.ts
import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favoritesSlice";

export * from "./favoritesSlice";
export * from "./hook";
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// types cho useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

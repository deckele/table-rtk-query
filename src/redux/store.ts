import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/api-slice";
import followersTableReducer from "../features/followers-table/followers-table-slice";

const store = configureStore({
  reducer: {
    followersTable: followersTableReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

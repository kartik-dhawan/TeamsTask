import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../reducers/apiSlice";

const store = configureStore({
  reducer: {
    user: apiReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;

export default store;

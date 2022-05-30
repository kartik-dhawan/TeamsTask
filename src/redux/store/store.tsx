import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/apiSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;

export default store;

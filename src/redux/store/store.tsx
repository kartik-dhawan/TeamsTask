import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/apiSlice";
import searchReducer from "../reducers/searchSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    search: searchReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;

export default store;

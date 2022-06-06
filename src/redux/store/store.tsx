import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/apiSlice";
import searchReducer from "../reducers/searchSlice";
import detailsReducer from "../reducers/detailsApiSlice";
import uniReducer from "../reducers/uniSlice";
import updateUniReducer from "../reducers/updateUniSlice";
import updatedRecordReducer from "../reducers/updateSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    search: searchReducer,
    details: detailsReducer,
    uni: uniReducer,
    updateUni: updateUniReducer,
    updateRecord: updatedRecordReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;

export default store;

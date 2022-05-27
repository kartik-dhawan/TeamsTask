import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// initial state and its type
interface dataType {
  data: any[];
  isLoading: boolean;
}

const initialState: dataType = {
  data: [],
  isLoading: false,
};

// thunk function
export const getData: any = createAsyncThunk("data/getData", async () => {
  return axios({
    method: "get",
    url: "http://universities.hipolabs.com/search?country=United+States",
  }).then((res) => res.data);
});

const apiSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  // defining the thunk's actions
  // thunk actions are defined in 'extraReducers' attribute
  extraReducers: {
    [getData.pending]: (state: dataType) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state: dataType, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getData.rejected]: (state: dataType) => {
      state.isLoading = false;
    },
  },
});

// importing the reducer
export default apiSlice.reducer;

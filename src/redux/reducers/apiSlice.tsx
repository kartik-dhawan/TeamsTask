import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// initializing the initial state
interface DataState {
  data: any[];
  isLoading: boolean;
}

const initialState: DataState = {
  data: [],
  isLoading: false,
};

// creating the async thunk
export const getData: any = createAsyncThunk("data/getData", async () => {
  return axios({
    method: "get",
    url: "http://universities.hipolabs.com/search?country=United+States",
  }).then((res) => res.data);
});

const apiSlice = createSlice({
  name: "api-data",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state: DataState) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state: DataState, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    [getData.rejected]: (state: DataState) => {
      state.isLoading = false;
    },
  },
});

export default apiSlice.reducer;

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
export const getDetails: any = createAsyncThunk("data/getData", async () => {
  return axios({
    method: "get",
    url: "https://gorest.co.in/public/v2/users",
  }).then((res) => res.data);
});

const detailsApiSlice = createSlice({
  name: "api-data",
  initialState,
  reducers: {},
  extraReducers: {
    [getDetails.pending]: (state: DataState) => {
      state.isLoading = true;
    },
    [getDetails.fulfilled]: (
      state: DataState,
      action: PayloadAction<any[]>
    ) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getDetails.rejected]: (state: DataState) => {
      state.isLoading = false;
    },
  },
});

export default detailsApiSlice.reducer;

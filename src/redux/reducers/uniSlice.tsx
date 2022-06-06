import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initializing the initial state

const objs = {
  alpha_two_code: "Country Code",
  domains: {
    0: `uni domain`,
  },
  name: "--- UNIVERSITY",
  country: "Uni's Location (Country)",
  web_pages: {
    0: `University's Website`,
  },
};

interface DataState {
  uniData: any;
  isLoading: boolean;
  deletedRows: any[];
}

const initialState: DataState = {
  uniData: objs,
  isLoading: false,
  deletedRows: [],
};

const uniSlice = createSlice({
  name: "specific-uni-data",
  initialState,
  reducers: {
    getUniData: (state: any, action: PayloadAction<any[]>) => {
      state.uniData = action.payload;
      state.deletedRows = [...state.deletedRows, state.uniData];
    },
  },
});

export const { getUniData } = uniSlice.actions;

export default uniSlice.reducer;

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
}

const initialState: DataState = {
  uniData: objs,
  isLoading: false,
};

const updateUniSlice = createSlice({
  name: "specific-uni-data",
  initialState,
  reducers: {
    getUniUpdatedData: (state: any, action: PayloadAction<any[]>) => {
      state.uniData = action.payload;
    },
  },
});

export const { getUniUpdatedData } = updateUniSlice.actions;

export default updateUniSlice.reducer;

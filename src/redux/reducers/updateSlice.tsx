import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initializing the initial state

interface DataState {
  afterDeleteUpdate: any[];
}

const initialState: DataState = {
  afterDeleteUpdate: [],
};

const updateSlice = createSlice({
  name: "specific-uni-data",
  initialState,
  reducers: {
    getFinalData: (state: any, action: PayloadAction<any>) => {
      state.afterDeleteUpdate = action.payload;
    },
  },
});

export const { getFinalData } = updateSlice.actions;

export default updateSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initializing the initial state
interface DataState {
  updatedData: any[];
  isLoading: boolean;
}

const initialState: DataState = {
  updatedData: [],
  isLoading: false,
};

const searchSlice = createSlice({
  name: "api-data",
  initialState,
  reducers: {
    updateData: (state: any, action: PayloadAction<any[]>) => {
      state.updatedData = action.payload;
    },
  },
});

export const { updateData } = searchSlice.actions;

export default searchSlice.reducer;

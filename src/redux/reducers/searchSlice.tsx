import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initializing the initial state
interface DataState {
  updatedData: any[];
  dataForSearch: any[];
  isLoading: boolean;
  isUpdated: boolean;
}

const initialState: DataState = {
  updatedData: [],
  dataForSearch: [],
  isLoading: false,
  isUpdated: false,
};

const searchSlice = createSlice({
  name: "api-data",
  initialState,
  reducers: {
    updateData: (state: any, action: PayloadAction<any[]>) => {
      state.updatedData = action.payload;
    },
    getDataToSearchFrom: (state: any, action: PayloadAction<any[]>) => {
      state.dataForSearch = action.payload;
    },
    sendUpdateConfirmation: (state: any, action: PayloadAction<boolean>) => {
      state.isUpdated = action.payload;
    },
  },
});

export const { updateData, getDataToSearchFrom, sendUpdateConfirmation } =
  searchSlice.actions;

export default searchSlice.reducer;

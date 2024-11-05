import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  file: [],
};

export const fileSlice = createSlice({
  name: "file",
  initialState: { value: initialStateValue },
  reducers: {
    fileStore: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default fileSlice.reducer;
export const { fileStore } = fileSlice.actions;

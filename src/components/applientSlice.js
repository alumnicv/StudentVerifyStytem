import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  senderEmail: "",
};

export const applicentSlice = createSlice({
  name: "applicent",
  initialState: { value: initialStateValue },
  reducers: {
    storeEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default applicentSlice.reducer;
export const { storeEmail } = applicentSlice.actions;

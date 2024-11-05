import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  _id: 0,
  uniqueId: "",
  name: "",
  dateOfBirth: "",
  regNo: 0,
  drgree: "",
  Branch: "",
  nameOfTheInstitution: "",
  University: "",
  yearOfPassing: "",
  yearOfStudy: "",
  CGPA: "",
  backlogs: "",
  classObtain: "",
  remark: "",
  file: [],
};

export const stdentSlice = createSlice({
  name: "student",
  initialState: { value: initialStateValue },
  reducers: {
    storeId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default stdentSlice.reducer;
export const { storeId } = stdentSlice.actions;

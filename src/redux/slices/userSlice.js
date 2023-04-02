import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: {
    first: "",
    last: "",
  },
  phone: "",
  address: "",
  errorMessage: false,
  errorMessagePhone: false,
  progress: 0,
  step: 1,
  completed: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    firstName: (state, action) => {
      state.name.first = action.payload;
    },
    lastName: (state, action) => {
      state.name.last = action.payload;
    },
    phone: (state, action) => {
      state.phone = action.payload;
    },
    address: (state, action) => {
      state.address = action.payload;
    },
    progress: (state, action) => {
      state.progress = action.payload;
    },
    nextStep: (state) => {
      state.step = state.step + 1;
    },
    forceStep: (state, action) => {
      state.step = action.payload;
    },
    prevStep: (state) => {
      state.step = state.step - 1;
    },
    errorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    errorMessagePhone: (state, action) => {
      state.errorMessagePhone = action.payload;
    },
    completed: (state, action) => {
      state.completed = action.payload;
    },
    clear: () => initialState,
  },
});

export const {
  firstName,
  lastName,
  phone,
  address,
  clear,
  progress,
  nextStep,
  prevStep,
  forceStep,
  errorMessage,
  errorMessagePhone,
  completed,
} = userSlice.actions;

export default userSlice.reducer;

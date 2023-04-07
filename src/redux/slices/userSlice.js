import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: {
    first: "",
    last: "",
  },
  phone: "",
  address: "",
  errorMessage: false,
  errorId: 0,
  progress: 0,
  step: 0,
  saved: 0,
  completed: false,
  completion: {
    name: { completed: false },
    phone: { completed: false },
    address: { completed: false },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    firstName: (state, action) => {
      if (state.name.first === "") {
        state.name.first = action.payload.toUpperCase();
      } else {
        state.name.first = action.payload;
      }
    },
    lastName: (state, action) => {
      if (state.name.last === "") {
        state.name.last = action.payload.toUpperCase();
      } else {
        state.name.last = action.payload;
      }
    },
    phone: (state, action) => {
      state.phone = action.payload;
    },
    address: (state, action) => {
      state.address = action.payload;
    },
    progressCurrent: (state, action) => {
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
    saveStamp: (state) => {
      state.saved = Date.now()
    },
    errorId: (state, action) => {
      state.errorId = action.payload;
    },
    completed: (state, action) => {
      state.completed = action.payload;
    },
    completeName: (state, action) => {
      state.completion.name.completed = action.payload;
    },
    completePhone: (state, action) => {
      state.completion.phone.completed = action.payload;
    },
    completeAddress: (state, action) => {
      state.completion.address.completed = action.payload;
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
  progressCurrent,
  nextStep,
  prevStep,
  forceStep,
  errorMessage,
  errorId,
  completed,
  quizPick,
  completeAddress,
  completeName,
  completePhone,
  saveStamp,
} = userSlice.actions;

export default userSlice.reducer;

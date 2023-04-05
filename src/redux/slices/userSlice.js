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
  progress: 20,
  step: 0,
  completed: false,
  prompt: {
    incomplete: false,
    name: false,
    phone: false,
  },
  records: {
    name: {
      visited: false,
      complete: false,
    },
    phone: {
      visited: false,
      complete: false,
    },
    address: {
      visited: false,
      complete: false,
    },
    quiz: {
      visited: false,
      complete: false,
    },
  },
  view: {
    0: "home",
    1: "name",
    2: "phone",
    3: "address",
  },
  quizPick: {},
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
    errorMessagePhone: (state, action) => {
      state.errorMessagePhone = action.payload;
    },
    completed: (state, action) => {
      state.completed = action.payload;
    },
    quizPick: (state, action) => {
      state.quizPick = action.payload;
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
  errorMessagePhone,
  completed,
  quizPick,
} = userSlice.actions;

export default userSlice.reducer;

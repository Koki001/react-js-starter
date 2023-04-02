import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  progress: 0,
  prompt: {
    incomplete: false,
    name: false,
    phone: false,
  },
  stages: {
    0: {
      visited: false,
      complete: false,
    },
    1: {
      visited: false,
      complete: false,
    },
    2: {
      visited: false,
      complete: false,
    },
    3: {
      visited: false,
      complete: false,
    },
  },
  step: 0
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
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
    clearProgress: () => initialState,
  },
});

export const { progress, nextStep, prevStep, forceStep } = progressSlice.actions;

export default progressSlice.reducer;

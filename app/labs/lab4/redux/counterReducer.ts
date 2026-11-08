import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 7 },
  reducers: {
    myReset: (state) => {
      state.count = 7;
    },
    reset: (state) => {
      state.count = 7;
    },
    up: (state) => {
      state.count += 1;
    },
    down: (state) => {
      state.count -= 1;
    },
  },
});

export const { up, down, myReset, reset } = counterSlice.actions;
export default counterSlice.reducer;

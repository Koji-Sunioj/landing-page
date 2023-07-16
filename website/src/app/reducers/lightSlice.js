import { createSlice } from "@reduxjs/toolkit";

export const initialModeState = {
  mode: "light",
};

export const modeSlice = createSlice({
  name: "mode",
  initialState: initialModeState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { changeMode } = modeSlice.actions;
export default modeSlice.reducer;

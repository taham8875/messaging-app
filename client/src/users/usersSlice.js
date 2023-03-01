import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = userSlice.actions;

export default userSlice.reducer;

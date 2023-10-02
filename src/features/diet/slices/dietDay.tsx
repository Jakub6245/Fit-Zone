import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { date: string } = {
  date: "today",
};

const userDietDay = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<{ date: string }>) => {
      state.date = action.payload.date;
    },
  },
});

export const { actions, reducer } = userDietDay;

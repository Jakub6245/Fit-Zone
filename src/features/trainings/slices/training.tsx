import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { date: string; id: string } = {
  date: "today",
  id: "",
};

const userTraining = createSlice({
  name: "training",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<{ date: string }>) => {
      state.date = action.payload.date;
    },
    setId: (state, action: PayloadAction<{ id: string }>) => {
      state.id = action.payload.id;
    },
  },
});

export const { actions, reducer } = userTraining;

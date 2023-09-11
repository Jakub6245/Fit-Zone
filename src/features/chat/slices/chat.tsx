import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { chatWithUser: string | null } = {
  chatWithUser: null,
};

const chatSlice = createSlice({
  name: "chatWithUser",
  initialState,
  reducers: {
    setChatWithUserToChat: (
      state,
      action: PayloadAction<{ chatWithUser: string | null }>
    ) => {
      state.chatWithUser = action.payload.chatWithUser;
    },
  },
});

export const { actions, reducer } = chatSlice;

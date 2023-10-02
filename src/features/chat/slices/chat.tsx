import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { chatWithUser: string | null; isChatOopen: boolean } = {
  chatWithUser: null,
  isChatOopen: false,
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
    setChatOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isChatOopen = action.payload.isOpen;
    },
  },
});

export const { actions, reducer } = chatSlice;

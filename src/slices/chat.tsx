import { createToastNotification } from "@/helpers/createToastNotification";
import { searchNotificationById } from "@/helpers/searchNotificationById";
import { NotificationType } from "@/types/NotificationType";
import { UserObjectType } from "@/types/UserType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

const initialState: { client: string | null } = {
  client: null,
};

const chatSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientToChat: (
      state,
      action: PayloadAction<{ client: string | null }>
    ) => {
      state.client = action.payload.client;
      console.log(state.client);
    },
  },
});

export const { actions, reducer } = chatSlice;

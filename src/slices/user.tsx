import { createToastNotification } from "@/helpers/createToastNotification";
import { searchNotificationById } from "@/helpers/searchNotificationById";
import { NotificationType } from "@/types/NotificationType";
import { UserObjectType } from "@/types/UserType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

const initialState: { user: UserObjectType | null } = {
  user: {} as UserObjectType,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserObjectType | null }>
    ) => {
      state.user = action.payload.user;
      console.log(state.user);
    },
  },
});

export const { actions, reducer } = userSlice;

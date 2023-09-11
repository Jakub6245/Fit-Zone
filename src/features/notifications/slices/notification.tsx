import { NotificationType } from "@/shared/types/NotificationType";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { notifications: NotificationType[] } = {
  notifications: [],
};

const notifications = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<{ notifications: NotificationType[] }>
    ) => {
      state.notifications = action.payload.notifications;
    },
  },
});

export const { actions, reducer } = notifications;

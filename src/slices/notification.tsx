import { searchNotificationById } from "@/helpers/searchNotificationById";
import { NotificationType } from "@/types/NotificationType";

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
      console.log(action.payload.notifications);
      state.notifications = action.payload.notifications;
    },
    deleteNotification: (
      state,
      action: PayloadAction<{ notificationId: string }>
    ) => {
      console.log(state.notifications);
      const notificationToDeleteIdx = searchNotificationById(
        state.notifications,
        action.payload.notificationId
      );
      console.log(notificationToDeleteIdx);
      state.notifications.splice(notificationToDeleteIdx, 1);
    },
  },
});

export const { actions, reducer } = notifications;

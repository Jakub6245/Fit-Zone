import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { NotificationObjectType } from "@/types/NotificationType";
import {
  deleteNotificationFromListFromDB,
  getNotificationList,
} from "./firebaseNotificationMethods";

export const notifications = createApi({
  reducerPath: "notifications",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    fetchUsersNotifications: builder.query<NotificationObjectType, string>({
      async queryFn(notificationId: string) {
        try {
          const data = await getNotificationList(notificationId);

          return { data: data as NotificationObjectType };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Notifications"],
    }),
    deleteNotificationFromList: builder.mutation<
      string,
      { userId: string; notificationId: string }
    >({
      async queryFn({ userId, notificationId }) {
        try {
          await deleteNotificationFromListFromDB(userId, notificationId);

          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useFetchUsersNotificationsQuery,
  useDeleteNotificationFromListMutation,
} = notifications;

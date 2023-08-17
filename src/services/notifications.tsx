import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import {
  dbUsersCollection,
  db,
  dbNotificationCollection,
} from "@/config/firebaseConfig";
import { UserObjectType } from "@/types/UserType";
import { NotificationType } from "@/types/NotificationType";

export const notifications = createApi({
  reducerPath: "notifications",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    fetchUsersNotifications: builder.query<
      { notifications: NotificationType[] },
      string
    >({
      async queryFn(userId: string) {
        try {
          const notifications = await getDoc(
            doc(dbNotificationCollection, userId)
          );

          return {
            data: notifications.data() as { notifications: NotificationType[] },
          };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useFetchUsersNotificationsQuery } = notifications;

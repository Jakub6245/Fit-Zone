import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { NotificationObjectType } from "@/types/NotificationType";
import {
  deleteNotificationFromListFromDB,
  getNotificationList,
} from "./firebaseNotificationMethods";
import {
  addClientToListToDB,
  getClientList,
} from "./firebaseClientListMethods";
import { ClientListType } from "@/types/ClientListType";

export const clientList = createApi({
  reducerPath: "clientList",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ClientList"],
  endpoints: (builder) => ({
    fetchUsersClientList: builder.query<ClientListType, string>({
      async queryFn(userId: string) {
        try {
          const data = await getClientList(userId);

          return { data: data as ClientListType };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["ClientList"],
    }),
    addClientToClientList: builder.mutation<
      string,
      { userId: string; clientId: string }
    >({
      async queryFn({ userId, clientId }) {
        try {
          await addClientToListToDB(userId, clientId);

          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["ClientList"],
    }),
  }),
});

export const {
  useFetchUsersClientListQuery,
  useAddClientToClientListMutation,
} = clientList;

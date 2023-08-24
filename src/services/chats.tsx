import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { NotificationObjectType } from "@/types/NotificationType";
import {
  deleteNotificationFromListFromDB,
  getNotificationList,
} from "./firebaseNotificationMethods";
import { getChatObject } from "./firebaseChatMethods";
import { ChatListType, ChatType } from "@/types/ChatListTypes";

export const chats = createApi({
  reducerPath: "chats",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    fetchUsersChat: builder.query<
      ChatType,
      { userId: string; clientId: string }
    >({
      async queryFn({ userId, clientId }) {
        try {
          const data = await getChatObject(userId, clientId);

          return { data: data as ChatType };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Chats"],
    }),
    // addMessageToChat: builder.mutation({
    //   async queryFn() {
    //     try {
    //     } catch (error) {
    //       return { error: error };
    //     }
    //   },
    // }),
  }),
});

export const { useFetchUsersChatQuery } = chats;

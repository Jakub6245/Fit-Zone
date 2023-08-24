import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { NotificationObjectType } from "@/types/NotificationType";
import {
  deleteNotificationFromListFromDB,
  getNotificationList,
} from "./firebaseNotificationMethods";
import { addMessageToChatInDB, getChatObject } from "./firebaseChatMethods";
import { ChatListType, ChatType } from "@/types/ChatListTypes";
import { MessageType } from "@/types/MessageType";

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
    addMessageToChat: builder.mutation<
      string,
      { userId: string; clientId: string; message: MessageType }
    >({
      async queryFn({ userId, clientId, message }) {
        try {
          await addMessageToChatInDB(userId, clientId, message);
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Chats"],
    }),
  }),
});

export const { useFetchUsersChatQuery, useAddMessageToChatMutation } = chats;

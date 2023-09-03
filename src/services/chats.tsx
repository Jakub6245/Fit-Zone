import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addMessageToChatInDB } from "./firebaseChatMethods";
import { getChatObject } from "./firebaseChatMethods";
import { ChatType } from "@/types/ChatListTypes";
import { MessageType } from "@/types/MessageType";

export const chats = createApi({
  reducerPath: "chats",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    fetchUsersChat: builder.query<
      ChatType,
      { userId: string; chatWithUser: string }
    >({
      async queryFn({ userId, chatWithUser }) {
        try {
          const data = await getChatObject(userId, chatWithUser);

          return { data: data as ChatType };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Chats"],
    }),
    addMessageToChat: builder.mutation<
      string,
      { userId: string; chatWithUser: string; message: MessageType }
    >({
      async queryFn({ userId, chatWithUser, message }) {
        try {
          await addMessageToChatInDB(userId, chatWithUser, message);
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

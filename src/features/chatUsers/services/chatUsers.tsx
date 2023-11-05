import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { addChatUserToListToDB, getChatUsersList } from "./chatUsersMethods";
import { ChatUsersListType } from "@/shared/types/ClhatUsersListType";

export const chatUsers = createApi({
  reducerPath: "chatUsers",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ChatUsers"],
  endpoints: (builder) => ({
    fetchChatUsersList: builder.query<ChatUsersListType, string>({
      async queryFn(userId: string) {
        try {
          const data = await getChatUsersList(userId);

          return { data: data as ChatUsersListType };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["ChatUsers"],
    }),
    addUserToChatUsersList: builder.mutation<
      string,
      { chatUsersId: string; userId: string }
    >({
      async queryFn({ chatUsersId, userId }) {
        try {
          await addChatUserToListToDB(chatUsersId, userId);

          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["ChatUsers"],
    }),
  }),
});

export const { useFetchChatUsersListQuery, useAddUserToChatUsersListMutation } =
  chatUsers;

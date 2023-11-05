import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  getAllUsers,
  getUserFromFirebase,
  updateUser,
} from "./firebaseUserMethods";
import { UserObjectType } from "@/shared/types/UserType";

export const firestoreApi = createApi({
  reducerPath: "users",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    fetchUsersData: builder.query<UserObjectType[], void>({
      async queryFn() {
        try {
          const users = (await getAllUsers()) as UserObjectType[];
          return { data: users };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Users"],
    }),
    fetchSingleUserData: builder.query<UserObjectType, string>({
      async queryFn(userId) {
        try {
          const user = (await getUserFromFirebase(userId)) as UserObjectType;
          return { data: user };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Users"],
    }),
    updateUserData: builder.mutation<
      string,
      { userId: string; userData: UserObjectType }
    >({
      async queryFn({ userId, userData }) {
        try {
          await updateUser(userId, userData);
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useFetchUsersDataQuery,
  useFetchSingleUserDataQuery,
  useUpdateUserDataMutation,
} = firestoreApi;

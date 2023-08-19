import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDocs, getDoc } from "firebase/firestore";
import { dbUsersCollection, db } from "@/config/firebaseConfig";
import { UserObjectType } from "@/types/UserType";

export const firestoreApi = createApi({
  reducerPath: "users",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    fetchUsersData: builder.query<UserObjectType[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(dbUsersCollection);
          let users: UserObjectType[] = [];
          querySnapshot?.forEach((doc) => {
            users.push({ ...doc.data() } as UserObjectType);
          });
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
          const docRef = doc(db, "users", userId);
          const data = await getDoc(docRef);
          let user = {} as UserObjectType;
          user = { ...(data.data() as UserObjectType) };
          return { data: user };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Users"],
    }),
  }),
});

export const { useFetchUsersDataQuery, useFetchSingleUserDataQuery } =
  firestoreApi;

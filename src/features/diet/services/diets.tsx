import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { getDietObject } from "./firebaseDietMethods";
import { DietObjectT } from "../types/dietObject";

export const dietObject = createApi({
  reducerPath: "dietObject",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["DietObject"],
  endpoints: (builder) => ({
    fetchUsersDietObject: builder.query<DietObjectT, string>({
      async queryFn(dietObjectId: string) {
        try {
          const data = await getDietObject(dietObjectId);
          console.log(data);
          return { data: data as DietObjectT };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["DietObject"],
    }),
  }),
});

export const { useFetchUsersDietObjectQuery } = dietObject;

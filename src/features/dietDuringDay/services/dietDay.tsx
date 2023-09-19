import { DietDayProductObjectT } from "@/features/product/types/productObject";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  deleteProductFromDayDiet,
  getDietDayObject,
} from "./firebaseDietDayMethods";
import { addProductToDayDiet } from "./firebaseDietDayMethods";
import { DietDayProductT } from "@/features/product/types/productObject";

export const dietDay = createApi({
  reducerPath: "dietDay",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["DietDay"],
  endpoints: (builder) => ({
    fetchUsersDietDay: builder.query<DietDayProductObjectT, string>({
      async queryFn(dietDayId: string) {
        try {
          const data = await getDietDayObject(dietDayId);
          console.log(data);
          return { data: data as DietDayProductObjectT };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["DietDay"],
    }),
    addProductToDietDay: builder.mutation<
      string,
      { dietDayId: string; productData: DietDayProductT }
    >({
      async queryFn({ dietDayId, productData }) {
        try {
          await addProductToDayDiet(dietDayId, productData);
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["DietDay"],
    }),
    deleteProductFromDietDay: builder.mutation<
      string,
      { dietDayId: string; productId: string }
    >({
      async queryFn({ dietDayId, productId }) {
        try {
          await deleteProductFromDayDiet(dietDayId, productId);
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["DietDay"],
    }),
  }),
});

export const {
  useFetchUsersDietDayQuery,
  useAddProductToDietDayMutation,
  useDeleteProductFromDietDayMutation,
} = dietDay;

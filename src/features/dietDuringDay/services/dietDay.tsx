import {
  DietDayProductObjectT,
  SavedDietDaysObjectType,
  SavedDietDaysType,
} from "@/features/product/types/productObject";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  deleteProductFromDayDiet,
  getDietDayObject,
  getSavedDietDay,
  getSavedDietDaysObject,
  saveDietDay,
  updateUsersDietDayObject,
} from "./firebaseDietDayMethods";
import { addProductToDayDiet } from "./firebaseDietDayMethods";
import { DietDayProductT } from "@/features/product/types/productObject";
import { DocumentData } from "firebase/firestore";

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
    fetchSavedDietDays: builder.query<SavedDietDaysObjectType, string>({
      async queryFn(savedDietDayId: string) {
        try {
          const data = await getSavedDietDaysObject(savedDietDayId);
          console.log(data);
          return { data: data as SavedDietDaysObjectType };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["DietDay"],
    }),
    fetchSingleSavedDietDay: builder.query<
    DietDayProductObjectT,
      { savedDietDaysId: string; date: string }
    >({
      async queryFn({ savedDietDaysId, date }) {
        try {
          const data = (await getSavedDietDay(
            savedDietDaysId,
            date
          )) as DocumentData;
          
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
    saveDietDay: builder.mutation<
      string,
      {
        savedDietDaysId: string;
        dietDay: SavedDietDaysType;
        dietDuringDayId: string;
      }
    >({
      async queryFn({ savedDietDaysId, dietDay, dietDuringDayId }) {
        try {
          await saveDietDay(savedDietDaysId, dietDay);
          await updateUsersDietDayObject(dietDuringDayId, { dietDay: [] });
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
  useFetchSingleSavedDietDayQuery,
  useFetchSavedDietDaysQuery,
  useFetchUsersDietDayQuery,
  useAddProductToDietDayMutation,
  useDeleteProductFromDietDayMutation,
  useSaveDietDayMutation,
} = dietDay;

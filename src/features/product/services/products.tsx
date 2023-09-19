import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getProductList } from "./firebaseProductsMethods";
import { DietDayProductT, ProductObjectT } from "../types/productObject";
import { addProductToDayDiet } from "@/features/dietDuringDay/services/firebaseDietDayMethods";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      async queryFn() {
        try {
          const data = (await getProductList()) as ProductObjectT;
          console.log(data);
          return { data: data as ProductObjectT };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useFetchProductsQuery } = products;

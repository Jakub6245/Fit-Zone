import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getProductList } from "./firebaseProductsMethods";
import { ProductObjectT } from "../types/productObject";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      async queryFn() {
        try {
          const data = (await getProductList()) as ProductObjectT;

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

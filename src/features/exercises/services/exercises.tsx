import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { getExerciseList } from "./exercisesMethods";
import { TrainingObjectT } from "@/features/trainings/types/training";

export const exercises = createApi({
  reducerPath: "exercises",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Exercises"],
  endpoints: (builder) => ({
    fetchExercise: builder.query({
      async queryFn() {
        try {
          const data = (await getExerciseList()) as TrainingObjectT;
          return { data: data as TrainingObjectT };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Exercises"],
    }),
  }),
});

export const { useFetchExerciseQuery } = exercises;

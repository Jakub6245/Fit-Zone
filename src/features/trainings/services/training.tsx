
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";


import { DocumentData } from "firebase/firestore";
import {
  addExerciseToTraining,
  deleteExerciseFromTraining,
  getSavedTraining,
  getSavedTrainingObject,
  getTrainingObject,
  saveTraining,
  updateUsersTrainingObject,
} from "./trainingMethods";
import {
  ExerciseT,
  SavedTrainingObjectT,
  SavedTrainingT,
  TrainingObjectT,
} from "../types/training";

export const training = createApi({
  reducerPath: "training",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Training"],
  endpoints: (builder) => ({
    fetchUsersTraining: builder.query<TrainingObjectT, string>({
      async queryFn(trainingId: string) {
        try {
          const data = await getTrainingObject(trainingId);

          return { data: data as TrainingObjectT };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Training"],
    }),
    fetchSavedTraining: builder.query<SavedTrainingObjectT, string>({
      async queryFn(savedTrainingId: string) {
        try {
          const data = await getSavedTrainingObject(savedTrainingId);
          
          return { data: data as SavedTrainingObjectT };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Training"],
    }),
    fetchSingleSavedTraining: builder.query<
      SavedTrainingT,
      { savedTrainingId: string; id: string }
    >({
      async queryFn({ savedTrainingId, id }) {
        try {
          const data = (await getSavedTraining(
            savedTrainingId,
            id
          )) as DocumentData;
          
          return { data: data as SavedTrainingT };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Training"],
    }),
    addExerciseToTraining: builder.mutation<
      string,
      { trainingId: string; exercise: ExerciseT }
    >({
      async queryFn({ trainingId, exercise }) {
        try {
          await addExerciseToTraining(trainingId, exercise);
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Training"],
    }),
    saveTraining: builder.mutation<
      string,
      {
        savedTrainingId: string;
        training: SavedTrainingT;
        trainingObjectId: string;
      }
    >({
      async queryFn({ savedTrainingId, training, trainingObjectId }) {
        try {
          await saveTraining(savedTrainingId, training);
          await updateUsersTrainingObject(trainingObjectId, { exercises: [] });
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Training"],
    }),
    deleteExerciseFromTraining: builder.mutation<
      string,
      { trainingId: string; exerciseId: string }
    >({
      async queryFn({ trainingId, exerciseId }) {
        try {
          await deleteExerciseFromTraining(trainingId, exerciseId);
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Training"],
    }),
  }),
});

export const {
  useFetchSingleSavedTrainingQuery,
  useFetchSavedTrainingQuery,
  useFetchUsersTrainingQuery,
  useAddExerciseToTrainingMutation,
  useDeleteExerciseFromTrainingMutation,
  useSaveTrainingMutation,
} = training;

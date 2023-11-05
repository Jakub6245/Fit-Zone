import { updateDoc, doc, getDoc } from "firebase/firestore";
import { dbExercisesCollection } from "@/config/firebaseConfig";
import {
  ExerciseT,
  TrainingObjectT,
} from "@/features/trainings/types/training";
import { exercisesListId } from "../config/exercisesListId";

export const addExerciseToListToDB = async (newExercise: ExerciseT) => {
  try {
    const exerciseList = (await getExerciseList()) as TrainingObjectT;
    exerciseList.exercises.push(newExercise);

    await updateExerciseList(exercisesListId, exerciseList);
  } catch (error) {
    console.error(error);
  }
};

export const updateExerciseList = async (
  userId: string,
  exerciseList: TrainingObjectT
) => {
  await updateDoc(doc(dbExercisesCollection, userId), {
    ...exerciseList,
  });
};

export const getExerciseList = async () => {
  try {
    // const isInDB = await isclientListInDB(uid);
    const response = await getDoc(doc(dbExercisesCollection, exercisesListId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};

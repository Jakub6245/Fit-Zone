import {
  dbSavedTrainingCollection,
  dbTrainingCollection,
} from "@/config/firebaseConfig";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import {
  ExerciseT,
  SavedTrainingObjectT,
  SavedTrainingT,
  TrainingObjectT,
} from "../types/training";

export const addTrainingObjectToDB = () => {
  try {
    const trainingObjectRef = doc(dbTrainingCollection);
    setDoc(trainingObjectRef, { exercises: [] });
    return trainingObjectRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const addSavedTrainingsObject = () => {
  try {
    const savedTrainingsObjectRef = doc(dbSavedTrainingCollection);
    setDoc(savedTrainingsObjectRef, { savedTrainings: [] });
    return savedTrainingsObjectRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const saveTraining = async (
  savedTrainingsId: string,
  newTraining: SavedTrainingT
) => {
  try {
    const savedTrainings = (await getSavedTrainingObject(
      savedTrainingsId
    )) as SavedTrainingObjectT;
    savedTrainings.savedTrainings.push(newTraining);

    await updateSavedTrainingObject(savedTrainingsId, savedTrainings);
  } catch (error) {
    console.error(error);
  }
};

export const addExerciseToTraining = async (
  trainingId: string,
  newExercise: ExerciseT
) => {
  try {
    const training = (await getTrainingObject(trainingId)) as TrainingObjectT;
    training.exercises.push(newExercise);

    await updateUsersTrainingObject(trainingId, training);
  } catch (error) {
    console.error(error);
  }
};

export const deleteExerciseFromTraining = async (
  trainingId: string,
  exerciseId: string
) => {
  try {
    const training = (await getTrainingObject(trainingId)) as TrainingObjectT;
    const productToDeleteIndex = training.exercises.findIndex(
      (el) => el.id === exerciseId
    );
    if (productToDeleteIndex !== -1) {
      training.exercises.splice(productToDeleteIndex, 1);
    }

    await updateUsersTrainingObject(trainingId, training);
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersTrainingObject = async (
  trainingId: string,
  trainingObject: TrainingObjectT
) => {
  await updateDoc(doc(dbTrainingCollection, trainingId), {
    ...trainingObject,
  });
};

export const updateSavedTrainingObject = async (
  userId: string,
  savedtrainingObject: SavedTrainingObjectT
) => {
  await updateDoc(doc(dbSavedTrainingCollection, userId), {
    ...savedtrainingObject,
  });
};

export const getTrainingObject = async (trainingObjectId: string) => {
  try {
    const response = await getDoc(doc(dbTrainingCollection, trainingObjectId));

    const data = response.data();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getSavedTraining = async (
  savedDietObjectId: string,
  id: string
) => {
  const training = (await getSavedTrainingObject(
    savedDietObjectId
  )) as SavedTrainingObjectT;
  if (!training) return;

  const givenDay = training.savedTrainings.find((el) => el.id === id);

  return givenDay;
};

export const getSavedTrainingObject = async (savedTrainingObjectId: string) => {
  try {
    const response = await getDoc(
      doc(dbSavedTrainingCollection, savedTrainingObjectId)
    );

    const data = response.data();

    if (!data) return;

    return data;
  } catch (err) {
    console.error(err);
  }
};

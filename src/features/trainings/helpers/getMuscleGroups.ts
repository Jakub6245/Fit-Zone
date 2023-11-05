import { ExerciseT } from "../types/training";

export const getMuscleGroups = (array: ExerciseT[]) => {
  const muscleGroupArray = array.map((el) => el.muscleGroup);
  return muscleGroupArray.filter(
    (value, index) => muscleGroupArray.indexOf(value) === index
  );
};

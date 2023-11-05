import { ExerciseT } from "../types/training";

export const filterExercises = (
  array: ExerciseT[],
  phrase: string,
  muscleGroup: string
) => {
  if (phrase.length < 3) return [];
  return array.filter((el) => {
    if (muscleGroup) {
      return (
        el.name.toLowerCase().includes(phrase.toLowerCase()) &&
        el.muscleGroup === muscleGroup
      );
    }
    return el.name.includes(phrase);
  });
};

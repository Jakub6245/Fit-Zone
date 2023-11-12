import { SavedTrainingT } from "@/features/trainings/types/training";

export const countSavedTrainings = (
  trainings: SavedTrainingT[],
  month: number
) => {
  const trainingsArray = trainings.filter((el) => {
    const trainingMonth = el.date.split("/")[1];
    if (Number(trainingMonth) === month) {
      return el;
    }
  });
  return trainingsArray.length;
};

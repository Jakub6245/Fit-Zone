import { SavedTrainingT } from "@/features/trainings/types/training";

export const calcTrainingIntensity = (
  data: SavedTrainingT["exercises"],
  muscleGroup: string
) => {
  const filteredData = filterMuscleGroups(data, muscleGroup);
  const trainingData = filteredData.map((el) => {
    if (el.repetitons && el.sets && el.weight) {
      return el.repetitons * el.sets * el.weight;
    }
    return 0;
  });
  return trainingData.reduce((acc, curr) => {
    acc += curr;

    return acc;
  }, 0);
};

export const filterMuscleGroups = (
  data: SavedTrainingT["exercises"],
  muscleGroup: string
) => {
  return data.filter((el) => el.muscleGroup === muscleGroup);
};

export const calcAllMuscleGroups = (data: SavedTrainingT["exercises"]) => {
  const chest = calcTrainingIntensity(data, "chest");
  const shoulders = calcTrainingIntensity(data, "shoulders");
  const lowerBody = calcTrainingIntensity(data, "lower body");
  const back = calcTrainingIntensity(data, "back");
  const arms = calcTrainingIntensity(data, "arms");
  return [chest, shoulders, lowerBody, back, arms];
};

export const calcProgress = (
  lastTraining: number[],
  penultimateTraining: number[]
) => {
  let result = [];
  for (let i = 0; i < lastTraining.length; i++) {
    const diffrence = lastTraining[i] - penultimateTraining[i];
    const percentage = (diffrence / penultimateTraining[i]) * 100;
    if (percentage > 100) {
      result.push(100);
    } else {
      result.push(Math.floor(percentage));
    }
  }
  return result;
};

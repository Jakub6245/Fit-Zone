export type TrainingObjectT = {
  exercises: ExerciseT[];
};

export type ExerciseT = {
  name: string;
  muscleGroup: string;
  id: string;
  sets: number | null;
  repetitons: number | null;
  weight: number | null;
};

export type SavedTrainingObjectT = {
  savedTrainings: SavedTrainingT[];
};

export type SavedTrainingT = {
  id: string;
  date: string;
  exercises: ExerciseT[];
};

import { useFetchExerciseQuery } from "@/features/exercises/services/exercises";
import { useState } from "react";
import { getMuscleGroups } from "../../helpers/getMuscleGroups";
import { TrainingSelectInput } from "../TrainingSelectInput/TrainingSelectInput";
import { TrainingInput } from "../TrainingInput/TrainingInput";
import { filterExercises } from "../../helpers/filterExercises";
import { Exercise } from "@/features/exercises/components/Exercise/Exercise";
import { PreviousTrainingDays } from "../PreviousTrainingDays/PreviousTrainingDays";
import { useTrainingDate } from "@/store/store";
import { CurrentTrainingDay } from "../CurrentTrainingDay/CurrentTrainingDay";
import { SavedTrainingDay } from "../SavedTrainingDay/SavedTrainingDay";
import styles from "./style.module.scss";

const currentDay = "today";

export const TrainingContainer = () => {
  const trainingDate = useTrainingDate();
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchedPhrase, setSearchedPhrase] = useState("");
  const { data } = useFetchExerciseQuery("");
  if (!data) return;

  const muscleGroups = getMuscleGroups(data.exercises);
  const searchingResults = filterExercises(
    data.exercises,
    searchedPhrase,
    muscleGroup
  );

  return (
    <div className={styles.training__container}>
      <PreviousTrainingDays />
      {trainingDate.date === currentDay && <CurrentTrainingDay />}
      {trainingDate.date === currentDay && (
        <div className={styles.training__container__inputs}>
          <TrainingInput phrase={searchedPhrase} onChange={setSearchedPhrase} />
          <TrainingSelectInput
            options={muscleGroups}
            onChange={setMuscleGroup}
          />
        </div>
      )}
      {trainingDate.date !== currentDay && <SavedTrainingDay />}
      {trainingDate.date === currentDay &&
        searchingResults.map((el, i) => <Exercise key={i} exercise={el} />)}
    </div>
  );
};

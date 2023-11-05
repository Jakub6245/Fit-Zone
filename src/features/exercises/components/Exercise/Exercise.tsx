import { ExerciseT } from "@/features/trainings/types/training";
import { useState } from "react";
import { ExerciseDataForm } from "../ExerciseDataForm/ExerciseDataForm";
import style from "./style.module.scss";

export const Exercise = ({ exercise }: { exercise: ExerciseT }) => {
  const [isExerciseFormIsShown, setIsExerciseFormIsShown] = useState(false);
  return (
    <div className={style.exercise__container}>
      <div className={style.exercise__text}>
        <p>{exercise.name}</p>
        <p>Muscle group: {exercise.muscleGroup}</p>
      </div>
      {!isExerciseFormIsShown && (
        <button
          className={style.exercise__button}
          onClick={() => setIsExerciseFormIsShown(true)}
        >
          Add exercise
        </button>
      )}
      {isExerciseFormIsShown && (
        <ExerciseDataForm
          isFormShown={setIsExerciseFormIsShown}
          exercise={exercise}
        />
      )}
    </div>
  );
};

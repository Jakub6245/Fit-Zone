import { useState } from "react";
import { useDeleteExerciseFromTrainingMutation } from "../../services/training";
import { ExerciseT } from "../../types/training";
import { useTrainingDate, useUser } from "@/store/store";
import style from "./style.module.scss";

export const TrainingDayItem = ({
  exerciseData,
}: {
  exerciseData: ExerciseT;
}) => {
  const user = useUser();
  const trainindDate = useTrainingDate();
  const [deleteExerciseFromTraining] = useDeleteExerciseFromTrainingMutation();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    deleteExerciseFromTraining({
      trainingId: user.trainingId,
      exerciseId: exerciseData.id,
    });
  };

  return (
    <div
      className={style.training__day__item__container}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <p>Exercise: {exerciseData.name}</p>
      <p>Muscle group: {exerciseData.muscleGroup}</p>
      <p>Sets: {exerciseData.sets}</p>
      <p>Repetitons: {exerciseData.repetitons}</p>
      <p>Weight: {exerciseData.weight} kg</p>
      {isHovering && trainindDate.date === "today" && (
        <button
          className={style.training__day__item__button}
          onClick={handleClick}
        >
          Delete
        </button>
      )}
    </div>
  );
};

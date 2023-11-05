import { boundTrainingActions } from "@/shared/hooks/useBindActionsToDispatch";
import styles from "./styles.module.scss";
import { SavedTrainingT } from "../../types/training";
export const PreviousTrainingDay = ({
  savedTraining,
}: {
  savedTraining: SavedTrainingT;
}) => {
  const handleClick = () => {
    boundTrainingActions.setDate({ date: savedTraining.date });
    boundTrainingActions.setId({ id: savedTraining.id });
  };

  return (
    <button
      className={styles.previous__training__day__button}
      onClick={handleClick}
    >
      {savedTraining.date}
    </button>
  );
};

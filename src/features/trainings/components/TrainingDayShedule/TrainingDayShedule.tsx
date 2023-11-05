import { useTrainingDate, useUser } from "@/store/store";
import {
  useFetchUsersTrainingQuery,
  useSaveTrainingMutation,
} from "../../services/training";
import { TrainingDayItem } from "../TrainingDayItem/TrainingDayItem";
import { getDate } from "@/features/dietDuringDay/helpers/getYesterdayDate";
import { TrainingObjectT } from "../../types/training";
import { uuid } from "uuidv4";
import styles from "./style.module.scss";

const currentDay = "today";

export const TrainingDayShedule = ({
  trainingDayData,
}: {
  trainingDayData: TrainingObjectT;
}) => {
  const user = useUser();
  const trainingDate = useTrainingDate();
  const [saveTraining] = useSaveTrainingMutation();
  const { data } = useFetchUsersTrainingQuery(user.trainingId);
  if (!data) return;

  const handleClick = () => {
    if (data.exercises.length > 0) {
      saveTraining({
        savedTrainingId: user.savedTrainingsId,
        training: {
          id: uuid(),
          exercises: data.exercises,
          date: getDate(),
        },
        trainingObjectId: user.trainingId,
      });
    }
  };
  return (
    <div>
      {trainingDayData.exercises.length === 0 && (
        <h1 className={styles.training__day__header}>
          Add your first exercise
        </h1>
      )}
      {trainingDayData.exercises.length > 0 && (
        <div className={styles.training__day__container}>
          {trainingDayData.exercises.map((el, i) => (
            <TrainingDayItem key={i} exerciseData={el} />
          ))}
          {trainingDate.date === currentDay && (
            <div className={styles.training__day__button__container}>
              <button
                className={styles.training__day__button}
                onClick={handleClick}
              >
                Save training
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

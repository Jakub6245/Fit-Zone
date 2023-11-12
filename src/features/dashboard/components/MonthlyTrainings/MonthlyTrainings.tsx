import { useFetchSavedTrainingQuery } from "@/features/trainings/services/training";
import { useUser } from "@/store/store";
import { countSavedTrainings } from "../../services/countSavedTrainings";
import styles from "./styles.module.scss";

export const MonthlyTrainings = () => {
  const user = useUser();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const { data } = useFetchSavedTrainingQuery(user.savedTrainingsId);
  if (!data) return;

  const numberOfTrainingsInThisMonth = countSavedTrainings(
    data.savedTrainings,
    currentMonth
  );
  return (
    <div>
      <h1 className={styles.monthly__trainings__header}>
        {numberOfTrainingsInThisMonth} trainings in this month
      </h1>
    </div>
  );
};

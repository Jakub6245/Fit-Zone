import { SavedDietDaysType } from "@/features/diet/types/dietObject";
import { calculateSum } from "@/features/dietDuringDay/helpers/sumDIetDuringDay";
import styles from "./styles.module.scss";

export const DashboardTableElement = ({
  dietDay,
}: {
  dietDay: SavedDietDaysType;
}) => {
  return (
    <div className={styles.dashboard__table__element}>
      <p className={styles.dashboard__table__element__text}>{dietDay.date}</p>
      <p className={styles.dashboard__table__element__text}>
        {calculateSum(dietDay.dietDay, "protein")}
      </p>
      <p className={styles.dashboard__table__element__text}>
        {calculateSum(dietDay.dietDay, "carbohydrates")}
      </p>
      <p className={styles.dashboard__table__element__text}>
        {calculateSum(dietDay.dietDay, "fats")}
      </p>
      <p className={styles.dashboard__table__element__text}>
        {calculateSum(dietDay.dietDay, "calories")}
      </p>
    </div>
  );
};

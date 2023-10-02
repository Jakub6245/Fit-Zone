import { calculateSum } from "@/features/dietDuringDay/helpers/sumDIetDuringDay";
import { DietDayProductObjectT } from "@/features/product/types/productObject";
import styles from "./styles.module.scss";
export const DietDaySummary = ({
  dietDay,
}: {
  dietDay: DietDayProductObjectT;
}) => {
  const calories = calculateSum(dietDay.dietDay, "calories");
  const protein = calculateSum(dietDay.dietDay, "protein");
  const fats = calculateSum(dietDay.dietDay, "fats");
  const carbohydrates = calculateSum(dietDay.dietDay, "carbohydrates");

  return (
    <div className={styles.diet__day__summary__container}>
      <p className={styles.diet__day__summary__text}>Summary of the day:</p>
      <p className={styles.diet__day__summary__text}>Calories: {calories}</p>
      <p className={styles.diet__day__summary__text}>Protein: {protein}</p>
      <p className={styles.diet__day__summary__text}>Fats: {fats}</p>
      <p className={styles.diet__day__summary__text}>
        Carbohydrates: {carbohydrates}
      </p>
    </div>
  );
};

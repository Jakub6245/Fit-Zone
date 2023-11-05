import { calculateSum } from "@/features/dietDuringDay/helpers/sumDIetDuringDay";
import { DietDayProductObjectT } from "../../types/dietObject";
import styles from "./styles.module.scss";

const calcNutritionValues = (dietDay: DietDayProductObjectT) => {
  return {
    calories: calculateSum(dietDay.dietDay, "calories"),
    protein: calculateSum(dietDay.dietDay, "protein"),
    fats: calculateSum(dietDay.dietDay, "fats"),
    carbohydrates: calculateSum(dietDay.dietDay, "carbohydrates"),
  };
};

export const DietDaySummary = ({
  dietDay,
}: {
  dietDay: DietDayProductObjectT;
}) => {
  const { calories, protein, fats, carbohydrates } =
    calcNutritionValues(dietDay);

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

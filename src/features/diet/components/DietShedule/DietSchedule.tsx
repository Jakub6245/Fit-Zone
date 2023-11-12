import { useUser } from "@/store/store";
import { useFetchUsersDietObjectQuery } from "../../services/diets";
import { useFetchUsersDietDayQuery } from "@/features/dietDuringDay/services/dietDay";
import { calculateSum } from "@/features/dietDuringDay/helpers/sumDIetDuringDay";
import styles from "./styles.module.scss";

export const DietShedule = () => {
  const user = useUser();
  const dietObject = useFetchUsersDietObjectQuery(user.dietObjectId);
  const dietDuringDay = useFetchUsersDietDayQuery(user.dietDayObjectId);
  if (!dietObject.data || !dietDuringDay.data) return;
  console.log(dietObject.data);
  return (
    <div className={styles.diet__shedule__container}>
      <p className={styles.diet__shedule__label}>
        Calories: {calculateSum(dietDuringDay.data.dietDay, "calories")}/
        {dietObject.data.calories}
      </p>
      <p className={styles.diet__shedule__label}>
        Protein: {calculateSum(dietDuringDay.data.dietDay, "protein")}/
        {dietObject.data.protein}
      </p>
      <p className={styles.diet__shedule__label}>
        Fats: {calculateSum(dietDuringDay.data.dietDay, "fats")}/
        {dietObject.data.fats}
      </p>
      <p className={styles.diet__shedule__label}>
        Carbohydrates:
        {calculateSum(dietDuringDay.data.dietDay, "carbohydrates")}/
        {dietObject.data.carbohydrates}
      </p>
    </div>
  );
};

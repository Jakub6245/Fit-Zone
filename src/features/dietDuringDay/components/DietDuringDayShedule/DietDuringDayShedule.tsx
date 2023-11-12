import { useDietDayDate, useUser } from "@/store/store";
import { useSaveDietDayMutation } from "../../services/dietDay";
import { DietDayProdcut } from "../DietDuringDayProduct/DietDuringDayProduct";
import styles from "./styles.module.scss";
import schedule from "node-schedule";
import { getDate } from "../../helpers/getYesterdayDate";
import { DietDayProductObjectT } from "@/features/diet/types/dietObject";
import { DietDaySummary } from "@/features/diet/components/DietDaySummary/DietDaySummary";

const currentDay = "today";

export const DietDayShedule = ({
  dietDay,
}: {
  dietDay: DietDayProductObjectT;
}) => {
  const user = useUser();
  const dietDayDate = useDietDayDate();
  const [saveDietDays] = useSaveDietDayMutation();

  schedule.scheduleJob("0 0 * * *", () => {
    if (dietDay.dietDay.length > 0) {
      saveDietDays({
        savedDietDaysId: user.savedDietDaysObjectId,
        dietDay: { dietDay: dietDay.dietDay, date: getDate() },
        dietDuringDayId: user.dietDayObjectId,
      });
    }
  });

  return (
    <div>
      {dietDay.dietDay.length === 0 && (
        <h1 className={styles.diet__during__day__header}>
          Add your first meal
        </h1>
      )}
      <div className={styles.diet__during__day__container}>
        {dietDay.dietDay.map((el, i) => (
          <DietDayProdcut productData={el} key={i} />
        ))}
      </div>
      {dietDayDate !== currentDay && <DietDaySummary dietDay={dietDay} />}
    </div>
  );
};

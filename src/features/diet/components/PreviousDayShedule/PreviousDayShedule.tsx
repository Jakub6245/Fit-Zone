import { DietDayShedule } from "@/features/dietDuringDay";
import { useFetchSingleSavedDietDayQuery } from "@/features/dietDuringDay/services/dietDay";
import { useDietDayDate, useUser } from "@/store/store";
import { PreviousDietDays } from "../PreviousDietDays/PreviousDietDays";
import { DietShedule } from "../DietShedule/DietSchedule";
export const PreviousDayShedule = () => {
  const user = useUser();
  const dietDayDate = useDietDayDate();
  const { data } = useFetchSingleSavedDietDayQuery({
    savedDietDaysId: user.savedDietDaysObjectId,
    date: dietDayDate,
  });
  if (!data) return;
  return (
    <div>
      <DietShedule />
      <PreviousDietDays />
      <DietDayShedule dietDay={data} />
    </div>
  );
};

import { DietDayShedule } from "@/features/dietDuringDay/components/DietDuringDayShedule/DietDuringDayShedule";
import { DietShedule } from "../DietShedule/DietSchedule";
import { ProductInput } from "@/features/product/components/ProductInput/ProductInput";
import { useFetchUsersDietDayQuery } from "@/features/dietDuringDay/services/dietDay";
import { useUser } from "@/store/store";
import { PreviousDietDays } from "../PreviousDietDays/PreviousDietDays";
export const CurrentDayShedule = () => {
  const user = useUser();
  const { data } = useFetchUsersDietDayQuery(user.dietDayObjectId);
  if (!data) return;
  return (
    <div>
      <DietShedule />
      <PreviousDietDays />
      <DietDayShedule dietDay={data} />
      <ProductInput />
    </div>
  );
};

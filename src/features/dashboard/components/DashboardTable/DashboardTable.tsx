import { useFetchSavedDietDaysQuery } from "@/features/dietDuringDay/services/dietDay";
import { DashboardTableValues } from "../DashboardTableValues/DashboardTableValues";
import { useUser } from "@/store/store";
import { DashboardTableElement } from "../DashboardTableElement/DashboardTableElement";

export const DashboardTable = () => {
  const user = useUser();
  const { data } = useFetchSavedDietDaysQuery(user.savedDietDaysObjectId);

  if (!data) return;

  return (
    <div>
      <DashboardTableValues />
      {data.savedDietDays.slice(-7).map((el, i) => (
        <DashboardTableElement key={i} dietDay={el} />
      ))}
    </div>
  );
};

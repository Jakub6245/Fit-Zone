import {
  DietForm,
  PreviousDayShedule,
  CurrentDayShedule,
} from "@/features/diet";

import Navigation from "@/shared/components/navigation/Navigation";
import { useDietDayDate, useUser } from "@/store/store";

const Diets = () => {
  const user = useUser();
  const isUserDietIsCreated = user.dietObjectId !== "";
  const dietDayDate = useDietDayDate();

  return (
    <div
      style={{
        height: "100vh",
        margin: "0 auto",
        backgroundColor: "lightgreen",
      }}
    >
      <Navigation />
      {!isUserDietIsCreated && <DietForm />}

      {dietDayDate === "today" && isUserDietIsCreated && <CurrentDayShedule />}
      {dietDayDate !== "today" && isUserDietIsCreated && <PreviousDayShedule />}
    </div>
  );
};

export default Diets;

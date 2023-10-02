import { DietForm } from "@/features/diet/components/DietForm/DietForm";
import { DietShedule } from "@/features/diet/components/DietShedule/DietSchedule";
import { PreviousDietDays } from "@/features/diet/components/PreviousDietDays/PreviousDietDays";

import Navigation from "@/shared/components/navigation/Navigation";
import { useDietDayDate, useUser } from "@/store/store";

import { CurrentDayShedule } from "@/features/diet/components/CurrentDayShedule/CurrentDayShedule";
import { PreviousDayShedule } from "@/features/diet/components/PreviousDayShedule/PreviousDayShedule";

const Diets = () => {
  const user = useUser();
  const isUserDietIsCreated = user.dietObjectId !== "";
  const dietDayDate = useDietDayDate();
  console.log(dietDayDate);

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

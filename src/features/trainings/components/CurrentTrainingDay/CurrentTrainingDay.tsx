import { useUser } from "@/store/store";
import { useFetchUsersTrainingQuery } from "../../services/training";
import { TrainingDayShedule } from "../TrainingDayShedule/TrainingDayShedule";

export const CurrentTrainingDay = () => {
  const user = useUser();
  const { data } = useFetchUsersTrainingQuery(user.trainingId);
  if (!data) return;
  return (
    <div>
      <TrainingDayShedule trainingDayData={data} />
    </div>
  );
};

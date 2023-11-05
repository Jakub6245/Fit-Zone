import { useTrainingDate, useUser } from "@/store/store";
import { useFetchSingleSavedTrainingQuery } from "../../services/training";
import { TrainingDayShedule } from "../TrainingDayShedule/TrainingDayShedule";

export const SavedTrainingDay = () => {
  const user = useUser();
  const trainingDate = useTrainingDate();
  const { data } = useFetchSingleSavedTrainingQuery({
    savedTrainingId: user.savedTrainingsId,
    id: trainingDate.id,
  });
  if (!data) return;

  return (
    <div>
      <TrainingDayShedule trainingDayData={data} />
    </div>
  );
};

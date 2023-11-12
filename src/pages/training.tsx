import { TrainingContainer } from "@/features/trainings";
import Navigation from "@/shared/components/navigation/Navigation";

const Training = () => {
  return (
    <div
      style={{
        backgroundColor: "lightgreen",
      }}
    >
      <Navigation />
      <TrainingContainer />
    </div>
  );
};

export default Training;

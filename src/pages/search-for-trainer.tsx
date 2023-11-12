import { TrainersContainer } from "@/features/searchfortrainer";
import Navigation from "@/shared/components/navigation/Navigation";

const SearchForTrainer = () => {
  return (
    <div
      style={{
        backgroundColor: "lightgreen",
      }}
    >
      <Navigation />
      <TrainersContainer />
    </div>
  );
};

export default SearchForTrainer;

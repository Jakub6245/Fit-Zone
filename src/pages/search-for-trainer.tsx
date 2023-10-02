import { TrainersContainer } from "@/features/searchForTrainer/components/TrainersContainer/TrainersContainer";
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

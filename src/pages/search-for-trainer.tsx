import { TrainerCard } from "@/features/searchfortrainer/components/TrainerCard";

import { useFetchUsersDataQuery } from "@/services/users";

const SearchForTrainer = () => {
  const { data, isLoading } = useFetchUsersDataQuery();
  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!data) return;
  const trainers = data.filter((user) => user.userType === "trainer");
  return (
    <div>
      {trainers.map((el, i) => {
        return <TrainerCard key={i} trainerData={el} />;
      })}
    </div>
  );
};

export default SearchForTrainer;

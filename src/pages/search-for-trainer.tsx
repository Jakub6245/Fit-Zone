import { TrainerCard } from "@/components/TrainerCard";
import { getGivenUsers } from "@/services/firebaseUserMethods";
import { useFetchUsersDataQuery } from "@/services/users";
import { UserObjectType } from "@/types/UserType";

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

import { TrainerCard } from "@/components/TrainerCard";
import { getGivenUsers } from "@/services/firebaseUserMethods";
import { UserObjectType } from "@/types/UserType";
import { useEffect, useState } from "react";

const SearchForTrainer = () => {
  const [trainers, setTrainers] = useState<UserObjectType[]>([]);
  console.log(trainers);
  useEffect(() => {
    (async () => {
      const trainers = (await getGivenUsers("trainer")) as UserObjectType[];
      console.log(trainers);
      setTrainers(trainers);
    })();
  }, []);
  return (
    <div>
      {trainers.map((el, i) => {
        return <TrainerCard key={i} trainerData={el} />;
      })}
    </div>
  );
};

export default SearchForTrainer;

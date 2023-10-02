import { TrainerCard } from "@/features/searchForTrainer/components/TrainerCard/TrainerCard";
import { filterUsers } from "@/features/searchForTrainer/helpers/filterUsers";

import { useFetchUsersDataQuery } from "@/services/users";

import styles from "./styles.module.scss";

export const TrainersContainer = () => {
  const { data } = useFetchUsersDataQuery();

  if (!data) return;

  const trainers = filterUsers(data, "trainer");

  return (
    <div className={styles.trainers__container}>
      {trainers.map((el, i) => {
        return <TrainerCard key={i} trainerData={el} />;
      })}
    </div>
  );
};

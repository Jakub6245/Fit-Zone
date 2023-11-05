import { TrainerCard } from "../TrainerCard/TrainerCard";
import { filterUsers } from "../../helpers/filterUsers";

import { useFetchUsersDataQuery } from "@/shared/services/users";

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

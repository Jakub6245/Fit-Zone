import styles from "./styles.module.scss";
import { useUser } from "@/store/store";

import { Dispatch, SetStateAction, useState } from "react";
import { boundTrainingActions } from "@/shared/hooks/useBindActionsToDispatch";
import { PreviousTrainingDay } from "../PreviousTrainingDay/PreviousTrainingDay";
import { useFetchSavedTrainingQuery } from "../../services/training";
import { SavedTrainingObjectT } from "../../types/training";

const currentDay = "today";
const elementsPerPage = 7;

const getPaginationStartingIndex = (
  data: SavedTrainingObjectT,
  currentPage: number
) => {
  return data.savedTrainings.length - (currentPage + 1) * elementsPerPage < 0
    ? 0
    : data.savedTrainings.length - (currentPage + 1) * elementsPerPage;
};

const getPaginationEndingIndex = (
  data: SavedTrainingObjectT,
  currentPage: number
) => {
  return data.savedTrainings.length - currentPage * elementsPerPage;
};

const handlePageChange = (
  changeType: "Prev" | "Next",
  onChange: Dispatch<SetStateAction<number>>
) => {
  if (changeType === "Prev") {
    onChange((prev: number) => prev + 1);
  }
  if (changeType === "Next") {
    onChange((prev: number) => prev - 1);
  }
};

export const PreviousTrainingDays = () => {
  const user = useUser();
  const { data } = useFetchSavedTrainingQuery(user.savedTrainingsId);
  const [currentPage, setCurrentPage] = useState(0);
  if (!data) return;
  const totalPages = Math.ceil(data.savedTrainings.length / elementsPerPage);

  const handleClick = () => {
    boundTrainingActions.setDate({ date: currentDay });
  };

  const paginationStartingIndex = getPaginationStartingIndex(data, currentPage);
  const paginationEndingIndex = getPaginationEndingIndex(data, currentPage);

  return (
    <div className={styles.previous__training__days__container}>
      <button
        className={styles.previous__training__days__button}
        disabled={currentPage === totalPages - 1}
        onClick={() => handlePageChange("Prev", setCurrentPage)}
      >
        Prev
      </button>
      <div>
        {data.savedTrainings
          .slice(paginationStartingIndex, paginationEndingIndex)
          .map((el, i) => (
            <PreviousTrainingDay savedTraining={el} key={i} />
          ))}
        <button
          className={styles.previous__training__days__button}
          onClick={handleClick}
        >
          Today
        </button>
      </div>
      <button
        className={styles.previous__training__days__button}
        disabled={currentPage === 0}
        onClick={() => handlePageChange("Next", setCurrentPage)}
      >
        Next
      </button>
    </div>
  );
};

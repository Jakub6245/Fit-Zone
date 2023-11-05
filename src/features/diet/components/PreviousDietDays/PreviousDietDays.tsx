import { useFetchSavedDietDaysQuery } from "@/features/dietDuringDay/services/dietDay";
import { useUser } from "@/store/store";
import { PrevousDietDay } from "../PreviousDietDay/PreviousDietDay";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { boundDietDayActions } from "@/shared/hooks/useBindActionsToDispatch";
import { SavedDietDaysObjectType } from "../../types/dietObject";

const currentDay = "today";
const elementsPerPage = 7;

const getPaginationStartingIndex = (
  data: SavedDietDaysObjectType,
  currentPage: number
) => {
  return data.savedDietDays.length - (currentPage + 1) * elementsPerPage < 0
    ? 0
    : data.savedDietDays.length - (currentPage + 1) * elementsPerPage;
};

const getPaginationEndingIndex = (
  data: SavedDietDaysObjectType,
  currentPage: number
) => {
  return data.savedDietDays.length - currentPage * elementsPerPage;
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

export const PreviousDietDays = () => {
  const user = useUser();
  const { data } = useFetchSavedDietDaysQuery(user.savedDietDaysObjectId);
  const [currentPage, setCurrentPage] = useState(0);
  if (!data) return;
  const totalPages = Math.ceil(data.savedDietDays.length / elementsPerPage);

  const handleClick = () => {
    boundDietDayActions.setDate({ date: currentDay });
  };

  const paginationStartingIndex = getPaginationStartingIndex(data, currentPage);

  const paginationEndingIndex = getPaginationEndingIndex(data, currentPage);

  return (
    <div className={styles.previous__days__container}>
      <button
        className={styles.previous__days__button}
        disabled={currentPage === totalPages - 1}
        onClick={() => handlePageChange("Prev", setCurrentPage)}
      >
        Prev
      </button>
      <div className={styles.previous__days__items}>
        {data.savedDietDays
          .slice(paginationStartingIndex, paginationEndingIndex)
          .map((el, i) => (
            <PrevousDietDay date={el.date} key={i} />
          ))}
        <button className={styles.previous__days__button} onClick={handleClick}>
          Today
        </button>
      </div>
      <button
        className={styles.previous__days__button}
        disabled={currentPage === 0}
        onClick={() => handlePageChange("Next", setCurrentPage)}
      >
        Next
      </button>
    </div>
  );
};

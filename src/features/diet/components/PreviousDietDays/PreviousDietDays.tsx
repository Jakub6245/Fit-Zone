import { useFetchSavedDietDaysQuery } from "@/features/dietDuringDay/services/dietDay";
import { useUser } from "@/store/store";
import { PrevousDietDay } from "../PreviousDietDay/PreviousDietDay";
import styles from "./styles.module.scss";
import { useState } from "react";
import { boundDietDayActions } from "@/shared/hooks/useBindActionsToDispatch";

export const PreviousDietDays = () => {
  const user = useUser();
  const { data } = useFetchSavedDietDaysQuery(user.savedDietDaysObjectId);
  const [currentPage, setCurrentPage] = useState(0);
  if (!data) return;
  const totalPages = Math.ceil(data.savedDietDays.length / 7); // Total number of pages
  const elementsPerPage = 7;
  const handlePageChange = (changeType: "Prev" | "Next") => {
    if (changeType === "Prev") {
      setCurrentPage((prev) => prev + 1);
    }
    if (changeType === "Next") {
      setCurrentPage((prev) => prev - 1);
    }
    // You can also fetch data for the new page here
  };

  const handleClick = () => {
    boundDietDayActions.setDate({ date: "today" });
  };

  const paginationStartingIndex =
    data.savedDietDays.length - (currentPage + 1) * elementsPerPage < 0
      ? 0
      : data.savedDietDays.length - (currentPage + 1) * elementsPerPage;

  console.log(
    data.savedDietDays.length - (currentPage + 1) * elementsPerPage,
    data.savedDietDays.length - currentPage * elementsPerPage
  );

  const paginationEndingIndex =
    data.savedDietDays.length - currentPage * elementsPerPage;

  console.log(
    data.savedDietDays.length - (currentPage + 1) * elementsPerPage,
    data.savedDietDays.length - currentPage * elementsPerPage
  );

  return (
    <div className={styles.previous__days__container}>
      <button
        className={styles.previous__days__button}
        disabled={currentPage === totalPages - 1}
        onClick={() => handlePageChange("Prev")}
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
        onClick={() => handlePageChange("Next")}
      >
        Next
      </button>
    </div>
  );
};

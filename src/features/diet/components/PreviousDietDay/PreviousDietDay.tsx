import { boundDietDayActions } from "@/shared/hooks/useBindActionsToDispatch";
import styles from "./styles.module.scss";
export const PrevousDietDay = ({ date }: { date: string }) => {
  const handleClick = () => {
    boundDietDayActions.setDate({ date });
  };

  return (
    <button
      onClick={handleClick}
      className={styles.previous__diet__days__button}
    >
      {date}
    </button>
  );
};

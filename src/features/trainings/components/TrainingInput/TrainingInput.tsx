import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

export const TrainingInput = ({
  phrase,
  onChange,
}: {
  phrase: string;
  onChange: (phrase: string) => void;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <form className={styles.training__form}>
      <input
        value={phrase}
        className={styles.training__input}
        onChange={handleChange}
        placeholder="search for exercise"
      />
    </form>
  );
};

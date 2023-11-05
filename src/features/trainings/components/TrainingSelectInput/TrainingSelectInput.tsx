import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

export const TrainingSelectInput = ({
  options,
  onChange,
}: {
  options: string[];
  onChange: (option: string) => void;
}) => {
  const handleSelectInputsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={styles.training__select__input}
      onChange={handleSelectInputsChange}
    >
      <option className={styles.training__select__input__option} value="">
        Choose muscle group
      </option>
      {options.map((el, i) => {
        return (
          <option
            className={styles.training__select__input__option}
            value={el}
            key={i}
          >
            {el}
          </option>
        );
      })}
    </select>
  );
};

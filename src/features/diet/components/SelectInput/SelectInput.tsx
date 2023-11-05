import { ChangeEvent } from "react";
import { SelectOptionT } from "../../types/selectOptions";
import styles from "./styles.module.scss";

export const SelectInput = ({
  options,
  onChange,
}: {
  options: SelectOptionT[];
  onChange: (value: string) => void;
}) => {
  const handleSelectInputsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <select
      required
      value=""
      onChange={handleSelectInputsChange}
      className={styles.select__input}
    >
      <option selected className={styles.select__input__option}>
        Select option
      </option>
      {options.map((el, i) => (
        <option
          className={styles.select__input__option}
          key={i}
          value={el.value}
        >
          {el.label}
        </option>
      ))}
    </select>
  );
};

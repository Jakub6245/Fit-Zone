import { Select } from "@chakra-ui/react";
import { ChangeEvent, FormEvent } from "react";
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

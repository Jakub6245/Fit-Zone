import { Select } from "@chakra-ui/react";
import { ChangeEvent, FormEvent } from "react";
import { SelectOptionT } from "../types/selectOptions";

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
    <Select
      required
      placeholder="Select option"
      onChange={handleSelectInputsChange}
    >
      {options.map((el, i) => (
        <option key={i} value={el.value}>
          {el.label}
        </option>
      ))}
    </Select>
  );
};

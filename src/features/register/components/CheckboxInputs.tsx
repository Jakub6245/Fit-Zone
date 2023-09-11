import { UserType } from "@/shared/types/UserType";
import React, { useState } from "react";
import { RadioGroup, Stack, Radio } from "@chakra-ui/react";

interface CheckboxGroupProps {
  options: UserType[];
  onChange: (selectedOption: UserType) => void;
}

const CheckBoxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
  const [checkedValue, setCheckedValue] = useState<UserType>("client");

  const handleCheckboxChange = (value: UserType) => {
    setCheckedValue(value);
    onChange(value);
  };

  return (
    <RadioGroup colorScheme="green" defaultValue="client">
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        {options.map((option, i) => (
          <Radio
            key={i}
            onChange={() => handleCheckboxChange(option)}
            value={option}
          >
            {option}
          </Radio>
          // <label key={option}>
          //   <input
          //     type="checkbox"
          //     value={option}
          //     checked={
          //       checkedValue ? option === checkedValue : option === "client"
          //     }

          //     name="userType"
          //   />
          //   {option}
          // </label>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default CheckBoxGroup;

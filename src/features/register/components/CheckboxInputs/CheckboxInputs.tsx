import { UserType } from "@/shared/types/UserType";
import React, { useState } from "react";
import { RadioGroup, Stack, Radio, Text } from "@chakra-ui/react";

interface CheckboxGroupProps {
  options: UserType[];
  onChange: (selectedOption: UserType) => void;
}

export const CheckBoxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  onChange,
}) => {
  const [checkedValue, setCheckedValue] = useState<UserType>("client");

  const handleCheckboxChange = (value: UserType) => {
    setCheckedValue(value);
    onChange(value);
  };

  return (
    <RadioGroup
      fontSize="2rem"
      size="lg"
      colorScheme="green"
      defaultValue="client"
    >
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        {options.map((option, i) => (
          <Radio
            key={i}
            onChange={() => handleCheckboxChange(option)}
            value={option}
          >
            <Text fontSize="large" fontWeight="bold">
              {option}
            </Text>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

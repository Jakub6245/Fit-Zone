import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent } from "react";

export const NumberInputElement = ({
  name,

  onChange,
}: {
  name: string;

  onChange: (valueAsString: string, valueAsNumber: number) => void;
}) => {
  return (
    <NumberInput min={1} name={name} onChange={onChange}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

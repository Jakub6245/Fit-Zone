import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import styles from "./styles.module.scss";

export const NumberInputElement = ({
  name,

  onChange,
}: {
  name: string;

  onChange: (valueAsString: string, valueAsNumber: number) => void;
}) => {
  return (
    <NumberInput
      min={1}
      name={name}
      onChange={onChange}
      size="lg"
      className={styles.number__input}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

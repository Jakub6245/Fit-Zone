import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const PasswordInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent) => void;
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="lg">
      <Input
        background="white"
        border="2px solid #074b07"
        name="password"
        fontSize="1.6rem"
        fontWeight="bold"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        onChange={(e) => onChange(e)}
        value={value}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;

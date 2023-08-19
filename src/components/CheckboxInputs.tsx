import { UserType } from "@/types/UserType";
import React, { useState } from "react";

interface CheckboxGroupProps {
  options: UserType[];
  onChange: (selectedOption: UserType | null) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
  const [checkedValue, setCheckedValue] = useState<UserType | null>(null);

  const handleCheckboxChange = (value: UserType) => {
    if (value === checkedValue) {
      setCheckedValue(null);
      onChange(null);
    } else {
      setCheckedValue(value);
      onChange(value);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={
              checkedValue ? option === checkedValue : option === "client"
            }
            onChange={() => handleCheckboxChange(option)}
            name="userType"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;

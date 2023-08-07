// components/CheckboxGroup.tsx
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
      // Uncheck the checkbox if it's already checked
      setCheckedValue(null);
      onChange(null);
    } else {
      // Check the checkbox if it's not checked
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
            checked={option === checkedValue}
            onChange={() => handleCheckboxChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;

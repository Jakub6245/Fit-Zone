// components/CheckboxGroup.tsx
import React, { useState } from "react";

interface CheckboxGroupProps {
  options: string[];
  onChange: (selectedOption: string | null) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
  const [checkedValue, setCheckedValue] = useState<string | null>(null);

  const handleCheckboxChange = (value: string) => {
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

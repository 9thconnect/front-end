import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectProps {
  label: string;
  options: { name: string; value: string | number | boolean | any }[];
  placeholder: string;
  state?: [
    string | number | undefined | any,
    React.Dispatch<React.SetStateAction<string | any | undefined>>
  ];
  disabled?: boolean;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  placeholder,
  state,
  disabled,
}) => {
  const [localValue, setLocalValue] = React.useState<
    string | number | undefined
  >(undefined);
  const [selectedValue, setSelectedValue] = state ?? [
    localValue,
    setLocalValue,
  ];

  // Convert value to string or empty string if undefined
  const value = selectedValue?.toString() || "";

  const handleValueChange = (newValue: string) => {
    // If using external state
    if (state) {
      setSelectedValue(newValue || undefined);
    } else {
      // If using local state
      setLocalValue(newValue || undefined);
    }
  };

  return (
    <Select disabled={disabled} value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.name} value={option.value.toString()}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;

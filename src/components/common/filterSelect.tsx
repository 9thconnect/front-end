// import React from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface FilterSelectProps {
//   label: string;
//   options: { name: string; value: string | number }[];
//   placeholder: string;
//   state?: [
//     string | number | undefined,
//     React.Dispatch<React.SetStateAction<string | any | undefined>>
//   ];
// }

// const FilterSelect: React.FC<FilterSelectProps> = ({
//   label,
//   options,
//   placeholder,
//   state,
// }) => {
//   const [selectedValue, setSelectedValue] =
//     state ?? React.useState<string | number | undefined>(undefined);

//   return (
//     <Select value={selectedValue?.toString()} onValueChange={setSelectedValue}>
//       <SelectTrigger className="w-full">
//         <SelectValue placeholder={placeholder} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>{label}</SelectLabel>
//           {options.map((option) => (
//             <SelectItem key={option.name} value={option.value.toString()}>
//               {option.name}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// };

// export default FilterSelect;

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
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  placeholder,
  state,
}) => {
  const [localValue, setLocalValue] = React.useState<
    string | number | undefined
  >(undefined);

  const [selectedValue, setSelectedValue] = state ?? [
    localValue,
    setLocalValue,
  ];

  return (
    <Select value={selectedValue?.toString()} onValueChange={setSelectedValue}>
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

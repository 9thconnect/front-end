// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import CollapsibleSection from "./collapsibleSection";

// interface FilterItem {
//   name: string;
//   value: string | number;
// }

// interface FilterSectionProps {
//   title: string;
//   items: FilterItem[];
//   isOpen: boolean;
//   onToggle: () => void;
//   selectedValue?: string | number;
//   onSelect?: (value: string | number) => void;
//   disabled?: boolean;
// }

// const FilterSection: React.FC<FilterSectionProps> = ({
//   title,
//   items,
//   isOpen,
//   onToggle,
//   selectedValue,
//   onSelect,
//   disabled,
// }) => {
//   return (
//     <CollapsibleSection title={title} isOpen={isOpen} onToggle={onToggle}>
//       <RadioGroup
//         value={selectedValue?.toString()}
//         onValueChange={(value) => onSelect && onSelect(value)}
//         disabled={disabled}
//       >
//         {items.map((item, index) => (
//           <div className="flex items-center space-x-2 mb-3" key={index}>
//             <RadioGroupItem
//               value={item.value.toString()}
//               id={`${title}-${index}`}
//             />
//             <Label
//               htmlFor={`${title}-${index}`}
//               className="pl-4 text-sm flex w-full justify-between items-center"
//             >
//               <p>{item.name}</p>
//             </Label>
//           </div>
//         ))}
//       </RadioGroup>
//     </CollapsibleSection>
//   );
// };

// export default FilterSection;

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CollapsibleSection from "./collapsibleSection";

interface FilterItem {
  name: string;
  value: string | number;
}

interface FilterSectionProps {
  title: string;
  items: FilterItem[];
  isOpen: boolean;
  onToggle: () => void;
  selectedValue?: string | number;
  onSelect?: (value: string | number | undefined) => void; // Updated type here
  disabled?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  isOpen,
  onToggle,
  selectedValue,
  onSelect,
  disabled,
}) => {
  const value = selectedValue?.toString() || "";

  const handleValueChange = (newValue: string) => {
    if (onSelect) {
      if (newValue === selectedValue?.toString()) {
        onSelect(undefined);
      } else {
        onSelect(newValue);
      }
    }
  };

  return (
    <CollapsibleSection title={title} isOpen={isOpen} onToggle={onToggle}>
      <RadioGroup
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        {items.map((item, index) => (
          <div className="flex items-center space-x-2 mb-3" key={index}>
            <RadioGroupItem
              value={item.value.toString()}
              id={`${title}-${index}`}
            />
            <Label
              htmlFor={`${title}-${index}`}
              className="pl-4 text-sm flex w-full justify-between items-center"
            >
              <p>{item.name}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </CollapsibleSection>
  );
};

export default FilterSection;

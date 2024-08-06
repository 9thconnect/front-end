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
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  isOpen,
  onToggle,
}) => {
  return (
    <CollapsibleSection title={title} isOpen={isOpen} onToggle={onToggle}>
      <RadioGroup defaultValue="comfortable">
        {items.map((item, index) => (
          <div className="flex items-center space-x-2 mb-3" key={index}>
            <RadioGroupItem value={item.name} id={`${title}-${index}`} />
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

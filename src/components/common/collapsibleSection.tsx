import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger
        className="flex w-full justify-between items-center border-b py-2"
        onClick={onToggle}
      >
        <p className="text-black text-lg">{title}</p>
        {isOpen ? <ChevronDown size={17} /> : <ChevronUp size={17} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        <div className="p-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;

import { PackageOpen } from "lucide-react";

const Empty = ({ text, size }: { text: string; size: number }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <PackageOpen color="red" size={size} strokeWidth={0.5} />
      <p className="text-center text-lg mt-4">{text}</p>
    </div>
  );
};

export default Empty;

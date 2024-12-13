import { LoaderCircleIcon } from "lucide-react";
import React from "react";

interface CounterProps {
  count: number;
  setCount: (count: number) => void;
  disable?: boolean;
  disableInput?: boolean;
  className?: string;
  loading?: boolean;
}

const Counter: React.FC<CounterProps> = ({
  count,
  setCount,
  disable,
  className,
  loading,
  disableInput,
}) => {
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // Determine the width of the input field based on the number of digits in the count
  const inputWidth = `${count.toString().length + 1}ch`;

  return (
    <div
      className={`${className} flex self-start items-center text-xl space-x-5 border rounded-md`}
    >
      <button disabled={disable} className="px-3 py-1" onClick={decrement}>
        -
      </button>
      {loading ? (
        <LoaderCircleIcon className="w-6 h-6 animate-spin " />
      ) : (
        <input
          style={{ width: inputWidth }}
          className="text-center text-offBlack border-none outline-none"
          type="number"
          value={count}
          onChange={(val) => setCount(Number(val.target.value))}
          disabled={disableInput || disable}
        />
      )}

      <button disabled={disable} className="px-3 py-1" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default Counter;

// import React from "react";

// interface CounterProps {
//   count: number;
//   setCount: React.Dispatch<React.SetStateAction<number>>;
// }

// const Counter: React.FC<CounterProps> = ({ count, setCount }) => {
//   const increment = () => setCount((prevCount) => prevCount + 1);
//   const decrement = () => setCount((prevCount) => prevCount - 1);

//   return (
//     <div className="flex self-end text-xl space-x-5 border rounded-md">
//       <button className="px-3 py-1" onClick={decrement}>
//         -
//       </button>
//       <input
//         size={count.toString().length}
//         className="text-center text-offBlack border-none outline-none"
//         type="number"
//         value={count}
//         onChange={(val) => setCount(Number(val.target.value))}
//       />
//       <button className="px-3 py-1" onClick={increment}>
//         +
//       </button>
//     </div>
//   );
// };

// export default Counter;

import React from "react";

interface CounterProps {
  count: number;
  setCount: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({ count, setCount }) => {
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // Determine the width of the input field based on the number of digits in the count
  const inputWidth = `${count.toString().length + 1}ch`;

  return (
    <div className="flex self-start text-xl space-x-5 border rounded-md">
      <button className="px-3 py-1" onClick={decrement}>
        -
      </button>
      <input
        style={{ width: inputWidth }}
        className="text-center text-offBlack border-none outline-none"
        type="number"
        value={count}
        onChange={(val) => setCount(Number(val.target.value))}
      />
      <button className="px-3 py-1" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default Counter;

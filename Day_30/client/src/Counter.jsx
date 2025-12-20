import React from "react";
import { useState } from "react";

export const Counter = () => {
  const [count, setCounter] = useState(0);
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Counter App</h1>
        <h2>count : {count}</h2>
        <button onClick={() => setCounter(count + 1)}>+</button>
        <button onClick={() => setCounter(0)}>*</button>
        <button onClick={() => setCounter(count - 1)}>-</button>
      </div>
    </>
  );
};

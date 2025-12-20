import React from "react";

export const Hello = ({ name, age }) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <p>Your Age {age}</p>
    </div>
  );
};

export default Hello;

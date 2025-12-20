import React from "react";
import Hello from "./Hello";

const App = () => {
  const users = [
    { id: 1, name: "Alice Johnson", Age: 28 },
    { id: 2, name: "Bob Smith", Age: 34 },
    { id: 3, name: "Charlie Davis", Age: 22 },
    { id: 4, name: "Diana Evans", Age: 29 },
    { id: 5, name: "Ethan Harris", Age: 41 },
    { id: 6, name: "Fiona Clark", Age: 25 },
    { id: 7, name: "George Lewis", Age: 37 },
    { id: 8, name: "Hannah Walker", Age: 30 },
    { id: 9, name: "Ian Scott", Age: 26 },
    { id: 10, name: "Jane Moore", Age: 33 },
  ];

  return (
    <div>
      <h1>Day 29: Prop Practice</h1>
      {users.map((user) => (
        <Hello key={user.id} name={user.name} age={user.Age} />
      ))}
    </div>
  );
};

export default App;

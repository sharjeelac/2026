import React from "react";
import { useEffect, useState } from "react";
import Counter from "./Counter";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      {data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
};

export default App;

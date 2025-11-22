const getTodo = async () => {
  try {
    console.log("1. Start Fetching Data...");

    const reponse = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await reponse.json();

    console.log("Data Recieved ", data);
  } catch (error) {
    console.log("Error Fetching Data ", error);
  }

  console.log("Function Finished!");
};

getTodo()
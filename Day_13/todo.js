const { writeFile } = require("fs");

const fs = require("fs").promises;
const filePath = "./todo.json";

const addTask = async (task) => {
  let data = [];

  try {
    const fileData = await fs.readFile(filePath, "utf8");
    data = JSON.parse(fileData);
  } catch (error) {}

  data.push(task);
  await fs.writeFile(filePath, JSON.stringify(data));
  console.log(`Saved : ${task}`);
};

const main = async () => {
  const command = process.argv[2];
  const arugment = process.argv[3];

  if (command === "add") {
    addTask(arugment);
  } else {
    console.log("Command not recognize!");
  }
};

main();

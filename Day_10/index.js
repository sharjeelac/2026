const { write, read } = require("fs");

const fs = require("fs").promises;

const readFileAsync = async (filePath) => {
  try {
    console.log("Starting to read file...");
    const data = await fs.readFile(filePath, "utf8");
    console.log("File read successfully.");
    return data;
  } catch (error) {
    console.log("Error reading file:", error);
    throw error;
  }
};

const writeFileAsync = async (filePath, data) => {
  try {
    console.log("Starting to write file...");
    await fs.writeFile(filePath, data, "utf8");
    console.log("File written successfully.");
  } catch (error) {
    console.log("Error writing file:", error);
    throw error;
  }
};
const appendFileAsync = async (filePath, data) => {
  try {
    console.log("Starting to append to file...");
    await fs.appendFile(filePath, data, "utf8");
    console.log("File appended successfully.");
  } catch (error) {
    console.log("Error appending to file:", error);
    throw error;
  }
};

writeFileAsync("example.txt", "Hello, World!\n");
appendFileAsync("example.txt", "Appending some data.\n");
readFileAsync("example.txt").then((data) => {
  console.log("File Content:\n", data);
});

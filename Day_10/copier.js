const fs = require("fs");
const path = require("path");

const copyFile = async (source, destination) => {
  try {
    console.log(`Copying file from ${source} to ${destination}...`);
    await fs.promises.copyFile(source, destination);
    console.log("File copied successfully.");
  } catch (error) {
    console.log("Error copying file:", error);
  }
};

copyFile("example.txt", "example_copy.txt");

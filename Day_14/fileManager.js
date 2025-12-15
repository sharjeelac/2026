const { fileURLToPath } = require("url");

const fs = require("fs").promises;

const createFile = async (fileName, content) => {
  try {
    await fs.writeFile(fileName, content);
    console.log("File SuccessFully Created.");
  } catch (error) {
    console.log(`Failed to create file , ${error}`);
  }
};

const readFile = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, "utf8");
    console.log(`File Content : ${data}`);
  } catch (error) {
    console.log(`Failed to read File. ${error}`);
  }
};

const updateFile = async (fileName, content) => {
  try {
    await fs.appendFile(fileName, content);
    console.log(`File SuccessFully Updated`);
  } catch (error) {
    console.log(`Failed To Update The File : ${error}`);
  }
};

const deleteFile = async (fileName) => {
  try {
    await fs.unlink(fileName);
    console.log("File Deleted");
  } catch (error) {
    console.log("Failed to Delete: ", error);
  }
};

module.exports = { createFile, readFile, updateFile, deleteFile };

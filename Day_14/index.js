const {
  readFile,
  updateFile,
  deleteFile,
  createFile,
} = require("./fileManager");

const main = async () => {
  try {
    const command = process.argv[2];
    const argument = process.argv[3];

    if (command === "add") {
      createFile("text.txt", argument);
    } else if (command === "read") {
      readFile("text.txt");
    } else if (command === "update") {
      updateFile("text.txt", argument);
    } else if (command === "delete") {
      deleteFile("text.txt");
    } else {
      console.log(`Inavlid Command`);
    }
  } catch (error) {}
};

main();

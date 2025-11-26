const fs = require("fs");

console.log(`1. Creating file...`);

const content = "My Name is Sharjeel Khalid";

try {
  fs.writeFileSync("message.txt", content);
  console.log("File created successfully");
} catch (error) {
  console.log(`Failed to write : ${error}`);
}

try {
  const data = fs.readFileSync("message.txt", "utf8");
  console.log("File Content : ", data);
} catch (error) {
  console.log("Failed to Read : ", error);
}

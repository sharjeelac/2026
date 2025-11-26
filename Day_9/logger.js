const fs = require("fs");

const logEvent = (message) => {
  try {
    const date = new Date().toISOString();
    const content = `\n${message} : ${date}`;
    fs.appendFileSync("logEvent.log", content);
    console.log("log successfully");
  } catch (error) {
    console.log(`Failed to log : ${error}`);
  }
};

logEvent("Hellow");

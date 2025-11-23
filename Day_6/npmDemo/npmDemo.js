// In Node, we use 'require' to import packages (Standard CommonJS)
const figlet = require("figlet");

figlet("Hello World!!", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        return;
    }
    console.log(data);
});
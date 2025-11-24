const _ = require("lodash");

const names = ["sharjeel", "shehzad", "ali"];
const numbers = [1, 3, 5, 6, 7];

console.log("___ORIGINAL___");
console.log(names);

const capitalizedNames = _.map(names, (name) => _.capitalize(name));

console.log("\n___LODAH-CAPITALIZED___");
console.log(capitalizedNames);

console.log("\n___SHUFFLE__");
console.log(_.shuffle(numbers));

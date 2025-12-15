const connect = require("./db.js");
const product = require("./ProductModel.js");

const item = { name: "Laptop", price: 1000 };

const newProduct = new product(item);

newProduct
  .save()
  .then(() => console.log("Saved"))
  .catch((err) => {
    console.log("Failed", err);
  });

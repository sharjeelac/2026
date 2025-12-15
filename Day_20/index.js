const Product = require("./ProductModel.js");
const connectDB = require("./db.js");

connectDB();

const productDetail = {
  name: "Mouse",
  price: 300,
};

const addProduct = async (product) => {
  try {
    await Product.create(product);
    console.log("Product Added");
  } catch (error) {
    console.log("failed to add product");
  }
};

const findProduct = async () => {
  try {
    const products = await Product.find();
    console.log(products);
  } catch (error) {
    console.log("Failed", error);
  }
};

// findProduct();

const findOneProduct = async () => {
  try {
    const products = await Product.findOne({ name: "Mouse" });
    console.log(products);
  } catch (error) {
    console.log("Failed", error);
  }
};

const updateProduct = async () => {
  try {
    const updateProduct = await Product.updateOne(
      { name: "laptop" },
      { $set: { name: "CPU" } }
    );
    console.log("update Product");
  } catch (error) {
    console.log(`Failed to update`, error);
  }
};

const deleteProduct = async () => {
  try {
    await Product.deleteOne({ name: "Mouse" });
    console.log("product Deleted");
  } catch (error) {
    console.log("failde to delete");
  }
};

const main = async () => {
  await addProduct(productDetail);
  await findOneProduct();
  await updateProduct();
  await deleteProduct();
};

main();

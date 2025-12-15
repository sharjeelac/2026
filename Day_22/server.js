import express, { json } from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.post("/user", (req, res) => {
  const user = req.body;
  console.log(user);
  res.json({ message: "User Created", user: user });
});

app.listen(3000, () => {
  console.log(`server is running on localhost:3000`);
});

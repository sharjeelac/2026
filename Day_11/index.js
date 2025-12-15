const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request URL: ", req.url);
  console.log("Request Method : ", req.method);
  if (req.url == "/pizza" && req.method == "GET") {
    res.end("Pizza on the Way");
  } else if (req.url == "/pizza" && req.method == "POST") {
    res.end("Your Received ");
    req.on;
  } else {
    res.end("Welcome Home");
  }
});

server.listen(3000, () => {
  console.log("Server is Runnig on 3000");
});

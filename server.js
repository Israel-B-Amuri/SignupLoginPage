const { request, response } = require("express");
const express = require("express");
const server = express();
const port = process.env.port || 3000;
const fileSystem = require("fs");
const { send } = require("process");

server.use(express.static("frontend")); //connect with html
server.use(express.json()); //get html in json format
server.use(express.urlencoded({ extended: true })); //decodes the received data from html form

server.post("/create/account", (request, response) => {
  fileSystem.writeFileSync("data.json", JSON.stringify(request.body));
  response.send("account created");
});

server.post("/login", (request, response) => {
  const file = fileSystem.readFileSync("data.json", "utf-8"); //reading through the database
  const fileContent = JSON.parse(file); //converting the file to a json file
  const userInput = request.body;

  if (
    userInput.password === fileContent.password &&
    userInput.username === fileContent.username
  ) {
    response.redirect("http://localhost:3000/home.html");
  } else {
    response.send("username or password  is incorrect");
  }
});

//host the program locally
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

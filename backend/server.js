const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/books", (req, res) => {
  res.send("Hello books!!");
});

app.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});

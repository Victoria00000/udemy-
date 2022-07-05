const express = require("express");

const cors = require("cors");

const app = express();

//-para permitir un solo origen de consulta-
//const options = {
// origin: "http://localhost:3000",
// useSuccessStatus: 200,
//};
// -y acá para permitir multi-origen de consulta-
let allowed = ["http://localhost:3000", "http://localhost:5000"];
const options = (req, res) => {
  let temp;
  let origin = req.header("Origin");
  allowed.includes(origin)
    ? (temp = { origin: true, useSuccessStatus: 200 })
    : (temp = { origin: false });
  res(null, temp);
};
app.use(cors(options)); //sin las options permite cualquier origen.

const { readdirSync } = require("fs");
readdirSync("./routes").map( rt => app.use("/", require("./routes/" + rt)));

app.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});

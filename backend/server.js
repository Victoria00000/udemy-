const express = require("express");

const cors = require("cors");

const app = express();

const dotenv = require('dotenv');
dotenv.config();

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

// ROUTES 
const { readdirSync } = require("fs");
readdirSync("./routes").map( rt => app.use("/", require("./routes/" + rt)));

// DATABASE
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
.then(() => console.log("Database connection established"))
.catch(err => console.log("Error connecting to database: " + err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening on http://localhost:8000");
});

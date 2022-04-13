const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

//get driver connection
const dbo = require("./db/com");

app.listen(port, () => {
  //perform database connection on server start
  dbo.connectToServer((err => {
    if (err) console.log(err);
  }));
  console.log((`Server is running on port: ${port}`));
});
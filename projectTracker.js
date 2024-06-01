const express = require("express");
const morgan = require("morgan");

const app = express();
const host = "localhost";
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("dashboard");
});

app.listen(port, host, () => {
  console.log(`Project tracker listening on port ${port} of host ${host}`);
})
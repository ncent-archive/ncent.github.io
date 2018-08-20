const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./server/routes")(app);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome"
  })
);
// app.post('/api/user', (req, res, next) => {
//   console.log(req.body);
//   res.status(200).send({ message: req.body });
// });

module.exports = app;

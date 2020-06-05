const express = require("express");
const mongoose = require("mongoose");
const expressip = require("express-ip");
const app = express();
const main = require("./controllers/main");
const storeVisits = require("./controllers/storeVisits");
const getHistory = require("./controllers/getHistory");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressip().getIpInfoMiddleware);

mongoose.connect(
  "mongodb+srv://admin:i64AqRzBhmO3rXBU@cluster0-4chch.mongodb.net/GasHistory?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

app.get("/", storeVisits, main);

app.get("/como-funciona", storeVisits, (req, res) => {
  res.render("landing");
});

app.get("/historico/:year", storeVisits, getHistory);

app.get("*", storeVisits, (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const moment = require("moment");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const response = await axios.get("https://www.madeira.gov.pt/drett/");
  const html = response.data;
  const $ = cheerio.load(html);
  const text = $("#divConteudo p").text();
  const x = text.match(/\d+(?:\.\d+)?/g);
  let prices = [];
  x.forEach((e) => {
    if (e.match(/^\d+\.\d\d\d$/)) {
      prices.push(e);
    }
  });
  const curPrices = prices.slice(0, 3);
  const nextWeekPrices = prices.slice(3, 6);

  const week = moment().isoWeek();
  const startCurWeek = moment()
    .day("Monday")
    .isoWeek(week)
    .format("DD/MM/YYYY");
  const endCurWeek = moment().day("Sunday").isoWeek(week).format("DD/MM/YYYY");
  const startNextWeek = moment()
    .day("Monday")
    .isoWeek(week + 1)
    .format("DD/MM/YYYY");
  const endNextWeek = moment()
    .day("Sunday")
    .isoWeek(week + 1)
    .format("DD/MM/YYYY");

  res.render("index", {
    curPrices,
    nextWeekPrices,
    startCurWeek,
    endCurWeek,
    startNextWeek,
    endNextWeek,
  });
});

app.get("/como-funciona", (req, res) => {
  res.render("landing");
});

app.listen(3000, () => {
  console.log("server listening");
});

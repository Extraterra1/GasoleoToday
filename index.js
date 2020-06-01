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
  // $("#divConteudo p").each(function (i, obj) {
  //   if ($(this).text().endsWith("€")) {
  //     console.log($(this).text());
  //   }
  // });
  const text = $("#divConteudo p").text();
  const initialDate = $("#divConteudo p strong")
    .first()
    .text()
    .replace(/\./g, "/")
    .split(" a ");
  const x = text.match(/\d+(?:\.\d+)?/g);
  let prices = [];
  x.forEach((e) => {
    if (e.match(/^\d+\.\d\d\d$/)) {
      prices.push(e);
    }
  });
  let curPrices = prices.slice(0, 3);
  let nextWeekPrices = prices.slice(3, 6);

  const week = moment(initialDate[0], "DD/MM/YYYY").isoWeek();
  let startCurWeek = initialDate[0];
  let endCurWeek = initialDate[1];
  let startNextWeek = moment()
    .day("Monday")
    .isoWeek(week + 1)
    .format("DD/MM/YYYY");
  let endNextWeek = moment()
    .day("Sunday")
    .isoWeek(week + 1)
    .format("DD/MM/YYYY");
  let weekStage = 0;
  let pricesDelayed = false;
  // If first week displayed on DRETT's site is not current but there are next week prices
  if (week !== moment().isoWeek() && nextWeekPrices.length > 0) {
    weekStage = 1;
    startCurWeek = startNextWeek;
    endCurWeek = endNextWeek;
    startNextWeek = initialDate[0];
    endNextWeek = initialDate[1];
    curPrices = prices.slice(3, 6);
    nextWeekPrices = prices.slice(0, 3);
    // If first week displayed on DRETT's site is not current and there are no next week prices
  } else if (week != moment().isoWeek() && nextWeekPrices.length === 0) {
    weekStage = 2;
    pricesDelayed = true;
  }
  res.render("index", {
    curPrices,
    weekStage,
    nextWeekPrices,
    startCurWeek,
    endCurWeek,
    startNextWeek,
    endNextWeek,
    pricesDelayed,
  });
});

app.get("/como-funciona", (req, res) => {
  res.render("landing");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});

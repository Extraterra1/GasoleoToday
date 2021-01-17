const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const main = async (req, res) => {
  const response = await axios.get("https://www.madeira.gov.pt/drett/");
  const html = response.data;
  const $ = cheerio.load(html);
  const text = $("#divConteudo p").text();
  const initialDate = $("#divConteudo span p")
    .text()
    .match(/\d{2}\.\d{2}\.\d{4}/g)
    .toString()
    .replace(/\./g, "/")
    .split(",");
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
  let startNextWeek = initialDate[2];
  let endNextWeek = initialDate[3];

  let weekStage = 0;
  let pricesDelayed = false;
  // If first week displayed on DRETT's site is not current but there are next week prices
  //if Current date is not between said dates
  if (!moment().isBetween(moment(initialDate[0], "DD/MM/YYYY"), moment(initialDate[1], "DD/MM/YYYY"), "day", "[]") && nextWeekPrices.length > 0) {
    weekStage = 1;
    startCurWeek = startNextWeek;
    endCurWeek = endNextWeek;
    startNextWeek = initialDate[0];
    endNextWeek = initialDate[1];
    curPrices = prices.slice(3, 6);
    nextWeekPrices = prices.slice(0, 3);
    // If first week displayed on DRETT's site is not current and there are no next week prices
  } else if (!moment().isBetween(moment(initialDate[0], "DD/MM/YYYY"), moment(initialDate[1], "DD/MM/YYYY"), "day", "[]") && nextWeekPrices.length === 0) {
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
    year: moment().year(),
  });
};

module.exports = main;

const Week = require("../models/weekModel");
const mongoose = require("mongoose");
const moment = require("moment");

const getHistory = async (req, res) => {
  const year = parseInt(req.params.year);
  const curYear = moment().year();
  if (year >= 2008 && year <= curYear) {
    const weeks = await Week.find({ year: year }).sort({ week: -1 });
    const totalEntries = await Week.countDocuments();
    res.render("priceHistory", { weeks, year, curYear, totalEntries });
  } else {
    res.redirect("/");
  }
};

module.exports = getHistory;

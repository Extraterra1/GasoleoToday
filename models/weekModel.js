const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
  submitted: {
    type: Date,
    default: Date.now(),
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  url: {
    type: String,
  },
  size: {
    type: String,
  },
  gasolina: {
    type: Number,
  },
  gasoleo: {
    type: Number,
  },
  gasoleocolor: {
    type: Number,
  },
  dateStr: {
    type: String,
  },
  week: {
    type: Number,
  },
  year: {
    type: Number,
  },
});

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;

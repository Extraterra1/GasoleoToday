const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now(),
  },
  ip: {
    type: String,
  },
  path: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;

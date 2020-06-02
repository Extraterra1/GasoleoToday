const Visit = require("../models/VisitModel");

const storeVisits = async (req, res, next) => {
  const newVisitor = await Visit.create({
    ip: req.ipInfo.ip,
    path: req.originalUrl,
    city: req.ipInfo.city,
    country: req.ipInfo.country,
  });
  next();
};

module.exports = storeVisits;

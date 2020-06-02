const Visit = require("../models/VisitModel");

const storeVisits = async (req, res, next) => {
  const newVisitor = await Visit.create({
    ip: req.ip,
    path: req.originalUrl,
  });
  next();
};

module.exports = storeVisits;

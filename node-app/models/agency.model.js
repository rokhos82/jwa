const mongoose = require("mongoose");

const Agency = mongoose.model(
  "Agency",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Agency;

const mongoose = require("mongoose");

const Audit = mongoose.model(
  "Audit",
  new mongoose.Schema({
    url: String,
    username: String,
    date: {type: Date, default: Date.now},
    information: String
  })
);

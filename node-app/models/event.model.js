const mongoose = require("mongoose");

const EventTypeSchema = new mongoose.Schema({
  name: String
});

const EventType = mongoose.model("EventType",EventTypeSchema);

module.exports = EventType;

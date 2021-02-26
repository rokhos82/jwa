const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  information: String,
  eventTypeId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "EventType"
  },
  outcome: Boolean,
  remoteAddress: {
    type: String,
    required: true
  }
});

const Audit = mongoose.model("Audit",AuditSchema);

module.exports = Audit;

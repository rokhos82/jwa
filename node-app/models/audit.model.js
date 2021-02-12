const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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
  outcome: Boolean
});

const Audit = mongoose.model("Audit",AuditSchema);

module.exports = Audit;

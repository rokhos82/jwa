const _ = require("lodash");
const db = require("../models/index.js");
const Audit = db.audit;

exports.eventsFetch = (req,res) => {
  // Get all of the audit events from the MongoDB.
  Audit.find({}).exec((err,events) => {
    if(err) {
      req.audit({
        information: "Audit Events Retrieval Failure",
        outcome: false
      });
      console.log(err);
      res.status(500).send("Unable to get Audit Events from database");
    }

    if(events) {
      req.audit({
        information: "Audit Events Retrieval Success",
        outcome: true
      });
      res.status(200).send(events);
    }
    else {
      req.audit({
        information: "Audit Events Retrieval Failure",
        outcome: false
      });
      res.status(500).send("Again, how...");
    }
  });
};

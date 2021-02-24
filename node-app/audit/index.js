/*
 *
 */
const _ = require("lodash");
const db = require("../models/index.js");
const Event = db.event;
const Audit = db.audit;

// This is a list of attributes to remove from the body or parameters to not log
// Things like: passwords
const blacklist = [
  "password"
];

function checkBlackList(obj,blacklist) {
  return _.omit(obj,blacklist);
}

const infoDefaults = {
  username: "unknown",
  remoteAddress: "0.0.0.0"
};

function auditLog(info) {
  // Make sure the audit information has the required defaults
  _.defaults(info,auditLog.defaults);
  _.defaults(info,infoDefaults);

  // Build the audit document and save it
  new Audit(info).save((err) => {
    if(err) {
      // Log the error if there is one
      console.log(err);
    }
  });
}

module.exports = (app) => {
  app.use((req,res,next) => {
    // Collect the information for auditing
    let info = {
      remoteAddress: req.connection.remoteAddress,
      url: req.originalUrl,
      body: checkBlackList(req.body,blacklist),
      params: checkBlackList(req.params,blacklist),
      username: req.headers.username || req.body.username || "unknown"
    };

    // Log basic information to the console
    console.log(info.remoteAddress + " accesssing URL: " + info.url);
    if(info.body && !_.isEmpty(info.body)) {
      console.log("Body: ",info.body);
    }
    if(info.params && !_.isEmpty(info.params)) {
      console.log("Params: ",info.params);
    }

    // Inject the audit system into the request for other controllers to use
    req.audit = auditLog;
    req.auditInfo = info;

    // Log the event to the database
    auditLog.defaults = {
      user: info.username,
      remoteAddress: info.remoteAddress
    };

    auditLog({
      information: "URL Accessed: " + info.url
    });

    next();
  });
};

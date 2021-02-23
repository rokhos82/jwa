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

module.exports = (app) => {
  app.use((req,res,next) => {
    // Collect the information for auditing
    let info = {
      remoteAddress: req.connection.remoteAddress,
      url: req.originalUrl,
      body: checkBlackList(req.body,blacklist),
      params: checkBlackList(req.params,blacklist),
      username: req.body.username || req.headers.username || "unknown"
    };

    // Log basic information to the console
    console.log(info.remoteAddress + " accesssing URL: " + info.url);
    if(info.body && !_.isEmpty(info.body)) {
      console.log("Body: ",info.body);
    }
    if(info.params && !_.isEmpty(info.params)) {
      console.log("Params: ",info.params);
    }

    // Log the event to the database
    let event = new Audit({
      information: "URL Accessed: " + info.url,
      remoteAddress: info.remoteAddress,
      user: info.username
    }).save((err) => {
      if(err) {
        console.log("Error",err);
      }
    });

    next();
  });
};

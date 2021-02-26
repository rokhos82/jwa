const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.agency = require("./agency.model.js");
db.user = require("./user.model.js");
db.role = require("./role.model.js");
db.event = require("./event.model.js");
db.audit = require("./audit.model.js");

db.ROLES = ["user","manager","admin"];

module.exports = db;

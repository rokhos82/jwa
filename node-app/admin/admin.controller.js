const _ = require("lodash");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;
const Agency = db.agency;

exports.getUsers = (req,res) => {
  // Get all of the users from the MongoDB.
  User.find({}).exec((err,users) => {
    if(err) {
      console.log(err);
      res.status(500).send("Unable to get Users from database");
    }

    if(users) {
      let info = _.map(users,(user) => {
        return {
          _id: user._id,
          name: user.name,
          fullName: user.fullName,
          username: user.username,
          roles: user.roles,
          agencyId: user.agencyId
        };
      });
      res.status(200).send(info);
    }
    else {
      res.status(500).send("I don't believe it...");
    }
  });
};

exports.getRoles = (req,res) => {
  Role.find({}).exec((err,roles) => {
    if(err) {
      console.log(err);
      res.status(500).send("Unable to get Roles from database");
    }

    if(roles) {
      let info = _.map(roles,(role) => {
        return {
          _id: role._id,
          name: role.name
        };
      });

      res.status(200).send(info);
    }
    else {
      res.status(500).send("How did you get here!?  You shouldn't be able to get here.");
    }
  });
};

exports.getAgencies = (req,res) => {
  Agency.find({}).exec((err,agencies) => {
    if(err) {
      console.log(err);
      res.status(500).send("Unable to get Agencies from database");
    }

    if(agencies) {
      let info = _.map(agencies,(agency) => {
        return {
          _id: agency._id,
          name: agency.name
        };
      });

      res.status(200).send(info);
    }
    else {
      res.status(500).send("What!? How!?");
    }
  });
};

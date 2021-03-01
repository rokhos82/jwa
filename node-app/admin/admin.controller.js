const _ = require("lodash");
const db = require("../models/index.js");
const bcrypt = require("bcryptjs");
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

exports.getUser = (req,res) => {
  let _id = req.params.userId;
  User.findOne({
    _id: _id
  }).exec((err,user) => {
    if(err) {
      console.log(err);
      res.status(500).send("Unable to retrieve user information");
    }

    if(user) {
      res.status(200).send({
        _id: user._id,
        name: {
          first: user.name.first,
          last: user.name.last
        },
        fullName: user.fullName,
        username: user.username,
        roles: user.roles,
        agencyId: user.agencyId
      });
    }
    else {
      res.status(500).send("...unbelievable...");
    }
  });
};

exports.updateUser = (req,res) => {
  console.log("Entering the user update controller...");

  let updateInfo = {
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    },
    username: req.body.username,
    roles: req.body.roles
  };

  User.findByIdAndUpdate(req.body._id,updateInfo,(err,result) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(result);
  });
};

exports.deleteUser = (req,res) => {
  console.log("Entering delete user controller...");
  User.findByIdAndDelete(req.body._id,(err) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      res.status(200).send("User deleted.");
    }
  });
};

exports.resetPassword = (req,res) => {
  console.log("Entering password reset controller...");

  let authPassword = req.body.authPassword;
  let username = req.headers.username;

  // Find the logged in user and authenticate them
  User.findOne({
    username: username
  }).exec((err,user) => {
    if(err) {
      // Something went wrong.
      req.audit({
        information: "Server error"
      });
      console.log(err);
      return res.status(500).send({ message: "Server error" });
    }

    if(!user) {
      req.audit({
        information: "User not found",
        outcome: false
      });
      console.log("Unable to find user");
      return res.status(401).send({ message: "Invalid username or password" });
    }

    let passwordIsValid = bcrypt.compareSync(authPassword,user.password);

    if(!passwordIsValid) {
      req.audit({
        information: "Invalid password entered",
        outcome: false
      });
      console.log("Invalid password entered");
      return res.status(401).send({
        accessToken: null,
        message: "Invalid username or password"
      });
    }

    let newPassword = bcrypt.hashSync(req.body.newPassword,8);
    let userId = req.body.userId;

    User.findByIdAndUpdate(userId,{ password: newPassword },(err) => {
      if(err) {
        // Something went wrong
        console.log(err);
        res.status(500).send({ message: "Server Error" });
      }

      res.status(200).send({ message: "Password reset successful" });
    });
  });
};

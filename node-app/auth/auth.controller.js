const _ = require("lodash");
const config = require("../auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req,res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password,8),
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    }
  });

  user.save((err,user) => {
    if(err) {
      req.audit({
        information: "Failed to create user",
        outcome: false
      });
      res.status(500).send({ message: err });
      return;
    }

    if(req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err,roles) => {
          if(err) {
            req.audit({
              information: "Failed to create user",
              outcome: false
            });
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if(err) {
              req.audit({
                information: "Failed to create user",
                outcome: false
              });
              res.status(500).send({ message: err });
              return;
            }

            req.audit({
              information: "Successfully created user",
              outcome: true
            });
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({
        name: "user"
      },(err, role) => {
        if(err) {
          req.audit({
            information: "Failed to create user",
            outcome: false
          });
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if(err) {
            req.audit({
              information: "Failed to create user",
              outcome: false
            });
            res.status(500).send({ message: err });
            return;
          }

          req.audit({
            information: "Successfully created user",
            outcome: true
          });
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req,res) => {
  User.findOne({
    username: req.body.username
  }).populate(
    "roles",
    "-__v"
  ).exec((err,user) => {
    if(err) {
      req.audit({
        information: "Unable to retrieve a user of that name"
      });
      return res.status(500).send({ message: err });
    }

    if(!user) {
      req.audit({
        information: "User not found",
        outcome: false
      });
      return res.status(401).send({ message: "Invalid username or password." });
    }

    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if(!passwordIsValid) {
      req.audit({
        information: "Invalid password entered",
        outcome: false
      });
      return res.status(401).send({
        accessToken: null,
        message: "Invalid username or password."
      });
    }

    // Build the jwt and set the expiration time (currently 8 minutes for testing).
    let token = jwt.sign({ id: user.id },config.secret,{
      expiresIn: 1800 // 8 Hours
    });

    let authorities = [];

    for(let i = 0;i < user.roles.length;i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    req.audit({
      information: "User has been authenticated",
      ouctome: true
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      roles: authorities,
      accessToken: token
    });
  });
};

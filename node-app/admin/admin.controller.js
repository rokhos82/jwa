const _ = require("lodash");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

exports.getUsers = (req,res) => {
  // Get all of the users from the MongoDB.
  User.find({}).exec((err,users) => {
    if(err) {
      console.log(err);
    }

    if(users) {
      // Get a list of roles to change the role _id into a name.
      Role.find({}).exec((err,roles) => {
        if(err) {
          console.log(err);
        }

        if(roles) {
          users = _.map(users,(user) => {
            user.roles = _.map(user.roles,(userRole) => {
              return _.find(roles,{_id:userRole}).name;
            });
            return user;
          });

          console.log(users);
        }
      })
    }
  });
};

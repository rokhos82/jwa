const jwt = require("jsonwebtoken");
const config = require("./auth.config.js");
const db = require("./models/index.js");
const _ = require("lodash");
const User = db.user;
const Role = db.role;

protectPath = (req,res,next) => {
  // Build the list of paths that don't need to be protected
  let whitelist = config.whitelist;
  let url = req.originalUrl;

  if(_.includes(whitelist,url)) {
    // The path is in the whitelist.  Don't protect.
    console.log("Unprotected path: " + url);
    next();
  }
  else {
    // The path needs protecting.
    console.log("Protected path: " + url);
    let token = req.headers["x-access-token"];

    if(!token) {
      console.log("Access Denied - No token provided");
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,config.secret,(err,decoded) => {
      if(err) {
        console.log("Access Denied - Unauthorized access");
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  }
};

verifyToken = (req,res,next) => {
  let token = req.headers["x-access-token"];

  if(!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,config.secret,(err,decoded) => {
    if(err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err,user) => {
    if(err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find({
      _id: { $in: user.roles }
    },(err,roles) => {
      if(err) {
        res.status(500).send({ message: err });
        return;
      }

      for(let i = 0;i < roles.length;i++) {
        if(roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Admin Role!" });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  protectPath
};
module.exports = authJwt;

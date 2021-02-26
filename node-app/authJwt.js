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
    req.audit({
      information: `Accessing unprotected path: ${req.auditInfo.url}`,
      outcome: true
    });
    console.log("Unprotected path: " + url);
    next();
  }
  else {
    // The path needs protecting.
    req.audit({
      information: `Accessing protected path: ${req.auditInfo.url}`,
      outcome: true
    });
    console.log("Protected path: " + url);
    let token = req.headers["x-access-token"];

    if(!token) {
      req.audit({
        information: `Access Denied (No Token): ${req.auditInfo.url}`,
        outcome: false
      })
      console.log("Access Denied - No token provided");
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,config.secret,(err,decoded) => {
      if(err) {
        req.audit({
          information: `Access Denied (Unauthorized Token): ${req.auditInfo.url}`,
          outcome: false
        });
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
    req.audit({
      information: `Token Failure (No Token): ${req.auditInfo.url}`,
      outcome: false
    });
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,config.secret,(err,decoded) => {
    if(err) {
      req.audit({
        information: `Token Failure (Bad Token): ${req.auditInfo.url}`,
        outcome: false
      });
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.audit({
      information: `Token Verified: ${req.auditInfo.url}`,
      outcome: true
    })
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err,user) => {
    if(err) {
      req.audit({
        information: `Access Error (Admin): ${req.auditInfo.url}`,
        outcome: false
      });
      res.status(500).send({ message: err });
      return;
    }

    Role.find({
      _id: { $in: user.roles }
    },(err,roles) => {
      if(err) {
        req.audit({
          information: `Access Error (Admin): ${req.auditInfo.url}`,
          outcome: false
        });
        res.status(500).send({ message: err });
        return;
      }

      for(let i = 0;i < roles.length;i++) {
        if(roles[i].name === "admin") {
          req.audit({
            information: `Access Granted (Admin): ${req.auditInfo.url}`,
            outcome: true
          });
          next();
          return;
        }
      }

      req.audit({
        information: `Access Denied (Not Admin): ${req.auditInfo.url}`,
        outcome: false
      });

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

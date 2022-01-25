const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const appApi = express();
const sql = require('mssql');
const _ = require('lodash');
const sqlString = require('tsqlstring');
const path = require('path');
const fs = require('fs');

const dbConfig = require('./mongodb.config.js');
const db = require('./models/index.js');
const bcrypt = require("bcryptjs");
const Role = db.role;
const User = db.user;
const Agency = db.agency;
const EventType = db.event;

const authJwt = require("./authJwt.js");

db.mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`,{
  useNewUrlParser: true,
  useUnifiedToplogy: true
}).then(() => {
  console.log("Successfully connected to MongoDB!");
  initial();
}).catch((err) => {
  console.error("Connection error",err);
  process.exit();
});

function initial() {
  Agency.findOne({
    name: "JWA"
  }).exec((err,agency) => {
    if(err) {
      console.log(err);
    }

    if(!agency) {
      console.log("JWA agency does not exist.  Creating the agency.");
      let jwaAgency = new Agency({
        name: "JWA"
      }).save((err,agency) => {
        if(err) {
          console.log(err);
        }
      });
    }

    Role.estimatedDocumentCount((err, count) => {
      if(!err && count === 0) {
        new Role({
          name: "user"
        }).save((err) => {
          if(err) {
            console.log("Error",err);
          }

          console.log("Added 'user' to roles collection");

          new Role({
            name: "manager"
          }).save((err) => {
            if(err) {
              console.log("Error",err);
            }

            console.log("Added 'manager' to roles collection");

            new Role({
              name: "admin"
            }).save((err) => {
              if(err) {
                console.log("Error",err);
              }

              console.log("Added 'admin' to roles collection");

              User.findOne({
                username: "jwa.admin"
              }).exec((err,user) => {
                if(err) {
                  console.log(err);
                }

                if(!user) {
                  console.log("jwa.admin user does not exist.  Creating the user.");
                  let adminUser = new User({
                    username: "jwa.admin",
                    name: {
                      first: "JWA",
                      last: "Admin"
                    },
                    password: bcrypt.hashSync("123456",8)
                  });

                  Role.find({
                    name: { $in: ["user","manager","admin"] }
                  }).exec((err,roles) => {
                    if(err)  {
                      console.log(err);
                    }
                    adminUser.roles = roles.map(role => role._id);

                    Agency.findOne({
                      name: "JWA"
                    }).exec((err,agency) => {
                      if(err) {
                        console.log(err);
                      }

                      if(agency) {
                        adminUser.agencyId = agency._id;
                        adminUser.save(err => {
                          if(err) {
                            console.log(err);
                          }

                          console.log("jwa.admin user successfully created!");
                        });
                      }
                    });
                  });
                }
              });
            });
          });
        });
      }
    });
  });
}

const logFilename = '';
const logFileStream = fs.createWriteStream("./jwa.log",{flags: 'a'});

const {dbWare} = require("./db/index.js");

let localCache = {};
localCache.names = {};
localCache.incidents = {};

process.on('SIGINT',function() {
  console.log('Exiting via SIGINT');
  dbWare.pool.close();
  process.kill(0);
});

process.on('exit',function() {
  console.log('Exiting via exit event');
});

let myLogger = function(req,res,next) {
  console.log("Loading resource: " + req.originalUrl);
  next();
}

app.use(myLogger);

app.use(cors());

let staticPath = path.join(__dirname,"../dist");
console.log("Serving static path:",staticPath);
app.use(express.static(staticPath));

app.listen(8081,"0.0.0.0",() => {
  console.log('JWA listening on port 8081!');
});

////////////////////////////////////////////////////////////////////////////////
// API routes and controllers
////////////////////////////////////////////////////////////////////////////////

appApi.use(cors());
appApi.use(bodyParser.json());
appApi.use(bodyParser.urlencoded({ extended: true }));

require("./audit/index.js")(appApi);
require("./auth/auth.routes.js")(appApi);
require("./cache/cache.index.js")(appApi);
require("./admin/admin.routes.js")(appApi);
require("./names/name.routes.js")(appApi,dbWare);
require("./vehicles/vehicle.routes.js")(appApi,dbWare);
require("./incidents/incident.routes.js")(appApi,dbWare);
require("./test/test.routes.js")(appApi);
require("./audit/audit.routes.js")(appApi);

appApi.listen(8082,"0.0.0.0",() => {
  console.log(`Listening on port 8082`);
});

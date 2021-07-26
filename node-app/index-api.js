// Import nodejs libraries
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const sql = require("mssql");
const sqlString = require("tsqlstring");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const session = require("express-session");
const redis = require("redis");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

// Create the express app stack
const app = express();

// Import configurations
const dbConfig = require("./mongodb.config.js");

// Import API modules
const db = require("./models/index.js");

const Role = db.role;
const User = db.user;
const Agency = db.agency;
const EventType = db.event;

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

const authJwt = require("./authJwt.js");
const {dbWare} = require("./db/index.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'testing',
  resave: false,
  httpOnly: false
}));

require("./audit/index.js")(app);
require("./auth/auth.routes.js")(app);
require("./cache/cache.index.js")(app);
require("./admin/admin.routes.js")(app);
require("./names/name.routes.js")(app,dbWare);
require("./incidents/incident.routes.js")(app,dbWare);
require("./vehicles/vehicle.routes.js")(app,dbWare);
require("./test/test.routes.js")(app);
require("./audit/audit.routes.js")(app);

// Start the app listening on port 8001
// @TODO - Configure environment variables for port and bind address
app.listen(8001,"0.0.0.0",() => {
  console.log(`JWA API listening on port 8001`);
});

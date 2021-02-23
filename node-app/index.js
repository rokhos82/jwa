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

app.listen(8000,"0.0.0.0",() => {
  console.log('JWA listening on port 8000!');
});

appApi.use(cors());
appApi.use(bodyParser.json());
appApi.use(bodyParser.urlencoded({ extended: true }));

require("./audit/index.js")(appApi);
require("./auth/auth.routes.js")(appApi);
require("./cache/cache.index.js")(appApi);
require("./admin/admin.routes.js")(appApi);
require("./names/name.routes.js")(appApi,dbWare);
require("./incidents/incident.routes.js")(appApi,dbWare);
require("./test/test.routes.js")(appApi);

appApi.post('/names/contacts',(req,res) => {
  console.log('Querying Master Names Contacts');
  console.log(req.body);
  let params = req.body;

  let query = `select * from vNameContacts where FileNumber=${params.filenumber}`;

  dbWare.poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      console.log('Name Contact Query Complete');
      res.send(recordset);
    });
  });

  console.log(query);
});

/**
 * This handler expects a POST request with two parameters.
 * The first parameter is the offset into the select.
 * The second parameter is the fetch size of the select.
 * The third parameter are the search terms.
 */
appApi.post('/incidents/fetch',(req,res) => {
  console.log('Fetching Incidents');
  console.log(req.body);
  let params = req.body.terms;

  let whereClause = "";

  //params.incident = sqlString.escape(params.incident);

  // Check to see if there is an incident number in the search terms
  let whereClauseBuilder = "";
  if(_.has(params,"incident") && _.isString(params.incident) && params.incident !== "") {
    whereClauseBuilder += sqlString.format(" Incident like ? and",[params.incident]);
  }

  // Check to see if there is an officer ID in the search terms
  if(_.has(params,"officer") && _.isString(params.officer) && params.officer !== "") {
    whereClauseBuilder += sqlString.format(" ID like ? and",[params.officer]);
  }

  // Check to see if there is a reviwer ID in the search terms
  if(_.has(params,"reviewer") && _.isString(params.reviewer) && params.reviewer !== "") {
    whereClauseBuilder += sqlString.format(" Reviewer like ? and",[params.reviewer]);
  }

  // Check to see if there is an offense in the search terms
  if(_.has(params,"offense") && _.isString(params.offense) && params.offense !== "") {
    whereClauseBuilder += sqlString.format(" Offense like ? and",[params.offense]);
  }

  // Check to see if there is a date range in the search terms
  if(_.has(params,"reportDateBegin") && _.isString(params.reportDateBegin) && params.reportDateBegin !== ""
    && _.has(params,"reportDateEnd") && _.isString(params.reportDateEnd) && params.reportDateEnd !== "") {
    whereClauseBuilder += sqlString.format(" RptDate between convert(datetime,?) and convert(datetime,?) and",[params.reportDateBegin,params.reportDateEnd]);
  }

  // Add an extra truthy statement to make the query work if the search terms are empty
  whereClauseBuilder += " 1=1 and"

  // Trim off the trailing `add`
  whereClauseBuilder = whereClauseBuilder.slice(0,-4);

  whereClause = ` where${whereClauseBuilder}`;

  // Replace asterisks (*) with percent signs (%)
  whereClause = whereClause.replace(/\*/g,'%');

  let query = `select Incident,RptDate,RptTime,Offense,OffenseDesc,ID,Reviewer as ReviewerID from Incident${whereClause} order by RptDate,RptTime,BeginDate,BeginTime,EndDate,EndTime asc offset ${params.recordOffset} rows fetch next ${params.fetchSize} rows only; select count(*) as Count from Incident${whereClause};`;

  dbWare.poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      res.send(recordset);
    },(err) => {
      console.log(err.originalError.code,err.originalError.message);
    }).finally(() => {
      console.log(`Incident search query completed.`);
    });
  });

  console.log(query);
});

////////////////////////////////////////////////////////////////////////////////
// Narrative related handlers
////////////////////////////////////////////////////////////////////////////////

/**
 * This handler expects a GET request with the key being the last part of the
 * URL.  It then returns the details for the requested narrative.
 */
appApi.get('/narratives/:key',async (req,res) => {
  // Get the NarrativeKey from the URL
  let key = sqlString.escape(decodeURIComponent(req.params.key));
  console.log(`Narrative Key: ${key}`);

  let query = `select * from vIncidentNarrative where NarrativeID = ${key}`;
  console.log(`${query}`);

  dbWare.poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((result) => {
      res.send(result.recordset);
    },(err) => {
      console.log(err.originalError.code,err.originalError.message);
    }).finally(() => {
      console.log(`Narrative detail query completed.`);
    });
  });
});

appApi.listen(8001,"0.0.0.0",() => {
  console.log(`Listening on port 8001`);
});

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

const logFilename = '';
const logFileStream = fs.createWriteStream("./jwa.log",{flags: 'a'});

const config = {
  server: 'jcc-sql.jcc.ccjcc.us',
  user: 'test',
  password: 'test',
  database: 'CMIdb-test',
  driver: 'tedious'
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error',err => {
  console.log(err);
});

let localCache = {};
localCache.names = {};
localCache.incidents = {};

process.on('SIGINT',function() {
  console.log('Exiting via SIGINT');
  pool.close();
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

let auditLogger = function(req,res,next) {
  console.log("URL: " + req.originalUrl);
  next();
}

appApi.use(auditLogger);

appApi.use(cors());
appApi.use(bodyParser.json());

appApi.get('/',(req,res) => {
  return res.send('Received a GET HTTP method')
});

appApi.get('/names/detail/:filenumber',async (req,res) => {
  // Decode the filenumber and escape it to avoid SQL injection attacks.
  let filenumber = sqlString.escape(decodeURIComponent(req.params.filenumber));

  // @todo add some audit logging here too

  // Check the local cache
  if(_.has(localCache.names,filenumber)) {
    // The cache exists.  Return the cached data.
    console.log(`Cache exists, returning data for ${filenumber}`);
    res.send([localCache.names[filenumber]]);
  }
  else {
    // No cached value.  Query the database
    await poolConnect;
    let request = pool.request();

    let queryString = `select * from Name where FileNumber = ${filenumber}; select * from vNameContacts where FileNumber=${filenumber};`;

    request.query(queryString,function(err,result) {
      // Check for an error
      if(err) {
        // Print the error
        console.log(err);
      }
      else {
        // Query was succesful.  Process and return to front-end
        console.log(result);
        let r = {
          detail: result.recordsets[0][0],
          contacts: result.recordsets[1]
        };
        localCache.names[filenumber] = r;
        res.send([r]);
      }
    });
  }
});

appApi.post('/names/fetch',(req,res) => {
  console.log('Fetching Names');
  console.log(req.body);
  let params = req.body;

  let whereClause = ``;

  if(_.isNumber(params.fileNumber)) {
    whereClause += ` CAST(FileNumber) LIKE '${params.fileNumber}'`;
  }
  else {
    // Add in the terms from the parameters or use a placeholder if they are missing.
    // I used the placeholder of '%' here in the event of wanting *all* of the names.
    whereClause += _.isString(params.lastName) && params.lastName !== "" ? ` LastName like '${params.lastName}' and` : ` LastName like '%' and`;
    whereClause += _.isString(params.firstName) && params.firstName !== "" ? ` First like '${params.firstName}' and` : ` First like '%' and`;
    whereClause += _.isString(params.middleName) && params.middleName !== "" ? ` Middle like '${params.middleName}' and` : ` Middle like '%' and`;

    // Remove any trailing ' and' at the end of the query string
    whereClause = whereClause.slice(0,-4);
  }

  // Replace asterisks (*) with percent signs (%)
  whereClause = whereClause.replace(/\*/g,'%');

  // Setup the query string with the where where clause
  // Add in the order by, offset, and fetch next statements as well as the Count query for a total count of Name records.
  let query = `select FileNumber,LastName,First,Middle,DOB from Name where${whereClause} order by LastName,First,Middle asc offset ${params.recordOffset} rows fetch next ${params.fetchSize} rows only; select count(*) as Count from Name where${whereClause};`;

  poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      res.send(recordset);
    });
  });

  console.log(query);
});

appApi.post('/names/search',async (req,res) => {
  console.log(req.body);
  let params = req.body;
  if(params.fileNumber) {
    // Search by file number if it exists
  }
  else {
    // Search by name fields

    let sqlStr = `select FileNumber,LastName,First,Middle,DOB from Name where`;
    sqlStr += _.isString(params.lastName) && params.lastName !== "" ? ` LastName like '${params.lastName}' and` : "";
    sqlStr += _.isString(params.firstName) && params.firstName !== "" ? ` First like '${params.firstName}' and` : "";
    sqlStr += _.isString(params.middleName) && params.middleName !== "" ? ` Middle like '${params.middleName}' and` : "";

    //console.log(sqlStr);
    //console.log(sqlStr.split(' ').pop());

    // Trim off the trailing 'and' and and a ';'
    sqlStr = sqlStr.slice(0,-4);
    sqlStr += " order by LastName,First,Middle;";

    // Change any asterisks to per-cent signs
    sqlStr = sqlStr.replace(/\*/g,'%');

    // Log the search string for posterity
    console.log(sqlStr);

    // Query the database
    poolConnect.then((p) => {
      let request = p.request();

      request.query(sqlStr).then(function(recordset) {
        console.log('Query complete!');
        res.send(recordset);
      });
    });
  }
});

appApi.post('/names/contacts',(req,res) => {
  console.log('Querying Master Names Contacts');
  console.log(req.body);
  let params = req.body;

  let query = `select * from vNameContacts where FileNumber=${params.filenumber}`;

  poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      console.log('Name Contact Query Complete');
      res.send(recordset);
    });
  });

  console.log(query);
});

////////////////////////////////////////////////////////////////////////////////
// Incident related handlers
////////////////////////////////////////////////////////////////////////////////
appApi.get('/incidents/detail/:incidentnumber',async (req,res) => {
  // Decode the incident number and escape it to avoid SQL injection attacks.
  let incidentnumber = sqlString.escape(decodeURIComponent(req.params.incidentnumber));
  console.log(`Incident Number: ${incidentnumber}`);

  if(_.has(localCache.incidents,incidentnumber)) {
    // The cache exists.  Return the cached data.
    console.log(`Cache exists, returning data for ${incidentnumber}`);
    res.send([localCache.incidents[incidentnumber]]);
  }
  else {
    // No cached value.  Query the database
    await poolConnect;
    let request = pool.request();

    let queryString = `select * from vIncidents where Incident = ${incidentnumber}; select * from vIncidentContacts_CCIT where Incident = ${incidentnumber} order by ContactsKey; select * from vIncidentProperty where Incident = ${incidentnumber};`;

    request.query(queryString,function(err,result) {
      if(err) {
        console.log(err);
      }
      else {
        console.log(result);
        let r = {
          detail: result.recordsets[0][0],
          contacts: result.recordsets[1],
          property: result.recordsets[2]
        };
        localCache.incidents[incidentnumber] = r;
        res.send([r]);
      }
    });
  }
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
  let params = req.body;

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

  poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      res.send(recordset);
    },(err) => {
      console.log(err.originalError.code,err.originalError.message);
    }).finally(() => {
      console.log(`Incident search query completed`);
    });
  });

  console.log(query);
});

appApi.listen(8001,"0.0.0.0",() => {
  console.log(`Listening on port 8001`);
});

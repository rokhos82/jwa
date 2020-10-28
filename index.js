const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const appApi = express();
const sql = require('mssql');
const _ = require('lodash');

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

process.on('SIGINT',function() {
  console.log('Exiting via SIGINT');
  pool.close();
  process.kill(0);
});

process.on('exit',function() {
  console.log('Exiting via exit event');
});

/*app.get('/',(req,res) => {
  res.send('Hello World!');
});//*/

let myLogger = function(req,res,next) {
  console.log('LOGGED');
  next();
}

app.use(myLogger);

app.use(cors());

app.use(express.static('dist'));

app.listen(8000,() => {
  console.log('JWA listening on port 8000!');
});

appApi.use(cors());
appApi.use(bodyParser.json());

appApi.get('/',(req,res) => {
  return res.send('Received a GET HTTP method')
});

appApi.get('/names',(req,res) => {
  poolConnect.then((p) => {
    let request = p.request();

    request.query('select top(1000) FileNumber,LastName,First,Middle,DOB from Name;',function(err,recordset) {
      if(err) console.log(err);

      var names = [];

      _.forEach(recordset,record => {
        let r = `Name: ${record.First} ${record.Middle} ${record.LastName}`;
        //console.log(r);
        names.push(r)
      });

      res.send(recordset);
    });
  });
});

appApi.get('/names/:filenumber',async (req,res) => {
  let filenumber = req.params.filenumber;

  if(_.has(localCache.names,filenumber)) {
    // The cache exists.  Return the cached data.
    console.log(`Cache exists, returning data for ${filenumber}`);
    res.send([localCache.names[filenumber]]);
  }
  else {
    // No cached value.  Query the database
    await poolConnect;
    let request = pool.request();

    request.query(`select * from Name where FileNumber = ${filenumber}`,function(err,result) {
      if(err) console.log(err);
      console.log(result);
      localCache.names[filenumber] = result.recordset[0];
      res.send(result.recordset);
    });
  }
});

appApi.get('/names/search/:keyword',async (req,res) => {
  let keyword = req.params.keyword;

  await poolConnect;
  let request = pool.request();

  request.query(`select FileNumber,LastName,First,Middle,DOB from Name where LastName like '%${keyword}%' or First like '%${keyword}%' or Middle like '%${keyword}%'`,function(err,recordset) {
    if(err) console.log(err);
    res.send(recordset);
  });
});

appApi.post('/names/list',(req,res) => {
  let query = `select top(1000) FileNumber,LastName,First,Middle,convert(varchar,convert(date,[DOB]),20) as DOB from Name order by LastName,First,Middle;`;

  poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      console.log(recordset);
      res.send(recordset);
    });
  });
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
    sqlStr += " order by LastName,First;";

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
appApi.get('/incidents',(req,res) => {
  poolConnect.then((p) => {
    let request = p.request();

    console.log("INCIDENT QUERY: Selecting top 1000 Incidents");

    request.query('select top(1000) Incident,RptDate,RptTime,Offense,OffenseDesc,ID from Incident;',function(err,recordset) {
      if(err) console.log(err);

      res.send(recordset.recordset);
      console.log("INCIDENT QUERY COMPLETE");
    });
  });
});

appApi.listen(8001,() => {
  console.log(`Listening on port 8001`);
});

/*sql.connect(config,function(err) {
  if(err) console.log(err);

  let request = new sql.Request();

  request.query('select * from Name where DAY(DOB) = 10 and MONTH(DOB) = 11 AND YEAR(DOB) = 1982 order by First',function(err,recordset) {
    if(err) console.log(err);

    _.forEach(recordset,record => {
      console.log(`Name: ${record.First} ${record.Middle} ${record.LastName}`);
    });

    //console.log(recordset);
  });
});//*/

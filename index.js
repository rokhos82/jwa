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

let localCache = {};
localCache.names = {};

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
  sql.connect(config,function(err) {
    if(err) console.log(err);

    let request = new sql.Request();

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

appApi.get('/names/:filenumber',(req,res) => {
  let filenumber = req.params.filenumber;

  if(_.has(localCache.names,filenumber)) {
    // The cache exists.  Return the cached data.
    console.log(`Cache exists, returning data for ${filenumber}`);
    res.send([localCache.names[filenumber]]);
  }
  else {
    // No cached value.  Query the database
    sql.connect(config,function(err) {
      if(err) console.log(err);

      let request = new sql.Request();

      request.query(`select * from Name where FileNumber = ${filenumber}`,function(err,recordset) {
        if(err) console.log(err);
        console.log(recordset);
        localCache.names[filenumber] = recordset[0];
        res.send(recordset);
      });
    });
  }
});

appApi.get('/names/search/:keyword',(req,res) => {
  let keyword = req.params.keyword;
  sql.connect(config,function(err) {
    if(err) console.log(err);

    let request = new sql.Request();

    request.query(`select FileNumber,LastName,First,Middle,DOB from Name where LastName like '%${keyword}%' or First like '%${keyword}%' or Middle like '%${keyword}%'`,function(err,recordset) {
      if(err) console.log(err);
      res.send(recordset);
    });
  });
});

appApi.post('/names/list',(req,res) => {
  let query = `select top(1000) FileNumber,LastName,First,Middle,convert(varchar,convert(date,[DOB]),20) as DOB from Name order by LastName,First,Middle;`;

  sql.connect(config,function(err) {
    if(err) console.log(err);

    let request = new sql.Request();

    console.log(query);

    request.query(query,(err,recordset) => {
      if(err) console.log(err);
      res.send({set:recordset});
    });
  });
});

appApi.post('/names/search',(req,res) => {
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
    sql.connect(config,function(err) {
      if(err) console.log(err);

      let request = new sql.Request();

      request.query(sqlStr,function(err,recordset) {
        if(err) console.log(err);
        console.log('Query complete!');
        res.send({set:recordset});
      });
    });
  }
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

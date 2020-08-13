const express = require('express');
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

/*app.get('/',(req,res) => {
  res.send('Hello World!');
});//*/

let myLogger = function(req,res,next) {
  console.log('LOGGED');
  next();
}

app.use(myLogger);

app.use(express.static('dist'));

app.listen(8000,() => {
  console.log('JWA listening on port 8000!');
});

appApi.get('/',(req,res) => {
  return res.send('Received a GET HTTP method')
});

appApi.get('/names',(req,res) => {
  sql.connect(config,function(err) {
    if(err) console.log(err);

    let request = new sql.Request();

    request.query('select top(100) * from Name;',function(err,recordset) {
      if(err) console.log(err);

      var names = [];

      _.forEach(recordset,record => {
        let r = `Name: ${record.First} ${record.Middle} ${record.LastName}`;
        console.log(r);
        names.push(r)
      });

      res.send(recordset);
    });
  });
});

appApi.get('/names/:filenumber',(req,res) => {
  let filenumber = req.params.filenumber;
  sql.connect(config,function(err) {
    if(err) console.log(err);

    let request = new sql.Request();

    request.query(`select * from Name where FileNumber = ${filenumber}`,function(err,recordset) {
      if(err) console.log(err);
      res.send(recordset);
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

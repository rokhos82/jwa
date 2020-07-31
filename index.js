const express = require('express');
const app = express();
const sql = require('mssql');

const config = {
  server: 'jcc-sql.jcc.ccjcc.us',
  user: 'test',
  password: 'test',
  database: 'CMIdb-test',
  driver: 'tedious'
};

/*app.get('/',(req,res) => {
  res.send('Hello World!');
});*/

//app.use(express.static('dist'));

/*app.listen(8000,() => {
  console.log('JWA listening on port 8000!');
});//*/

sql.connect(config,function(err) {
  if(err) console.log(err);

  let request = new sql.Request();

  request.query('select top(10) * from Name;',function(err,recordset) {
    if(err) console.log(err);

    console.log(recordset);
  });
});

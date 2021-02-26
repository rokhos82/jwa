const sql = require("mssql");

const config = {
  server: 'jcc-sql.jcc.ccjcc.us',
  user: 'test',
  password: 'test',
  database: 'CMIdb-test',
  driver: 'tedious'
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on("error",err => {
  console.log(err);
});

exports.dbWare = {
  pool: pool,
  poolConnect: poolConnect,
  setup: (req,res,next) => {
    req.db = exports.dbWare;
    next();
  }
};

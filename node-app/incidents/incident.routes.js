/**
 *
 */
const authJwt = require("../authJwt.js");
const controller = require("./incident.controller.js");

module.exports = (app,db) => {
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/incidents/detail/:incidentnumber',[db.setup,authJwt.verifyToken],controller.incidentDetail);
};

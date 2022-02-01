/**
 *
 */
const authJwt = require("../authJwt.js");
const controller = require("./vehicle.controller.js");

module.exports = (app,db) => {
  console.info(`Setting up vehicle routes`);
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/vehicles/fetch",[authJwt.verifyToken,db.setup],controller.vehicleFecth);
  app.get("/vehicles/lookups",[authJwt.verifyToken,db.setup],controller.vehicleLookups);
};

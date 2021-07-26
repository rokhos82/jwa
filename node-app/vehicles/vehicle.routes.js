/**
 *
 */
const authJwt = require("../authJwt.js");
const controller = require("./vehicle.controller.js");

module.exports = (app,db) => {
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/vehicles/fetch",[db.setup],controller.vehicleFecth);
};

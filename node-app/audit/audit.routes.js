const authJwt = require("../authJwt.js");
const controller = require("./audit.controller.js");

module.exports = (app) => {
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post("/api/audit/fetch",[authJwt.verifyToken,authJwt.isAdmin],controller.eventsFetch);
};

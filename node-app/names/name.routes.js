/**
 *
 */
const authJwt = require("../authJwt.js");
const controller = require("./name.controller.js");

module.exports = (app,db) => {
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/",controller.test);
  app.get("/names/detail/:filenumber",[authJwt.verifyToken,db.setup],controller.nameDetail);
  app.post("/names/fetch",[authJwt.verifyToken,db.setup],controller.nameFetch);
  //app.post("/names/search",[authJwt.verifyToken,db.setup],controller.nameSearch);
};

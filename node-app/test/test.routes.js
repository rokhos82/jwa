const authJwt = require("../authJwt.js");
const controller = require("./test.controller.js");

module.exports = (app) => {
  console.log("Setting up test API routes");
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all",controller.allAccess);

  app.get("/api/test/user",[authJwt.verifyToken],controller.userAccess);

  app.get("/api/test/admin",[authJwt.verifyToken,authJwt.isAdmin],controller.adminAccess);
};

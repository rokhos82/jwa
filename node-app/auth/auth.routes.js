const authJwt = require("../authJwt.js");
const controller = require("./auth.controller.js");

module.exports = (app) => {
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post('/api/auth/signup',[authJwt.verifyToken,authJwt.isAdmin],controller.signup);

  app.post("/api/auth/signin",controller.signin);
};

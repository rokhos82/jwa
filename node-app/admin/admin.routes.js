const authJwt = require("../authJwt.js");
const controller = require("./admin.controller.js");

module.exports = (app) => {
  app.use((req,res,next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.use(authJwt.protectPath);

  app.get('/api/admin/users',[authJwt.verifyToken,authJwt.isAdmin],controller.getUsers);
  app.get('/api/admin/roles',[authJwt.verifyToken,authJwt.isAdmin],controller.getRoles);
  app.get('/api/admin/agencies',[authJwt.verifyToken,authJwt.isAdmin],controller.getAgencies);
};
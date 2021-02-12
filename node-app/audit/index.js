module.exports = (app) => {
  app.use((req,res,next) => {
    console.log(req.connection.remoteAddress + " accessing URL: " + req.originalUrl);
    console.log("Body:",req.body);
    console.log("Params:",req.params);
    //console.log(req.headers);
    next();
  });
};

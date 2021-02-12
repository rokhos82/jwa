module.exports = (app) => {
  app.use((req,res,next) => {
    console.log("URL: " + req.originalUrl);
    console.log(req.body);
    console.log(req.params);
    //console.log(req.headers);
    next();
  });
};

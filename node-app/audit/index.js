module.exports = (app) => {
  app.use((req,res,next) => {
    console.log("URL: " + req.originalUrl);
    console.log(req.body);
    next();
  });
};

/**
 *
 */

const redis = require("redis");
const authJwt = require("../authJwt.js");

module.exports = (app) => {
  const client = redis.createClient();

  app.use((req,res,next) => {
    req.cache = client;
    req.cacheExpire = 60*5; // 5 minutes
    let key = req.originalUrl;
    client.get(key,(err,info) => {
      if(err) {
        console.log(err);
      }

      if(info) {
        const infoJSON = JSON.parse(info);
        console.log("Returning cached information");
        res.status(200).send(infoJSON);
      }
      else {
        next();
      }
    });
  });
};

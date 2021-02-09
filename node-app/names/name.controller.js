/**
 *
 */

// Include libraries for this module
const sqlString = require("tsqlstring");
const _ = require("lodash");
const redis = require("redis");

// Setup the local connection the client
const client = redis.createClient();

/**
 * This is for testing purposes
 */
exports.test = (req,res) => {
  return res.status(200).send("Public content.");
};

/**
 * Name detail controller
 */
exports.nameDetail = (req,res) => {
  // Decode the filenumber and escape it to avoid SQL injection attacks.
  let filenumber = sqlString.escape(decodeURIComponent(req.params.filenumber));
  const db = req.db;

  // @todo add some audit logging here too

  // Check redis for the name detail record
  let result = client.get(`${filenumber}`,(err,info) => {
    if(info) {
      const infoJSON = JSON.parse(info);
      console.log("Getting info from cache");
      res.send([infoJSON]);
      //return res.status(200).json(infoJSON);
    } else {
      // No cached value.  Query the database
      db.poolConnect.then((p) => {
        let request = db.pool.request();

        let queryString = `select * from Name where FileNumber = ${filenumber}; select * from vNameContacts where FileNumber=${filenumber};`;

        request.query(queryString,function(err,result) {
          // Check for an error
          if(err) {
            // Print the error
            console.log(err);
          }
          else {
            // Query was succesful.  Process and return to front-end
            let r = {
              detail: result.recordsets[0][0],
              contacts: result.recordsets[1]
            };
            client.set(`${filenumber}`,JSON.stringify(r),'EX',120,() => {
              console.log("Information saved to cache");
            });
            res.send([r]);
          }
        });
      });
    }
  });

  // Check the local cache
  /*if(_.has(localCache.names,filenumber)) {
    // The cache exists.  Return the cached data.
    console.log(`Cache exists, returning data for ${filenumber}`);
    res.send([localCache.names[filenumber]]);
  }
  else {
    // No cached value.  Query the database
    await poolConnect;
    let request = pool.request();

    let queryString = `select * from Name where FileNumber = ${filenumber}; select * from vNameContacts where FileNumber=${filenumber};`;

    request.query(queryString,function(err,result) {
      // Check for an error
      if(err) {
        // Print the error
        console.log(err);
      }
      else {
        // Query was succesful.  Process and return to front-end
        console.log(result);
        let r = {
          detail: result.recordsets[0][0],
          contacts: result.recordsets[1]
        };
        localCache.names[filenumber] = r;
        res.send([r]);
      }
    });
  }*/
};

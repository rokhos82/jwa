/**
 *
 */

// Include libraries for this module
const sqlString = require("tsqlstring");
const _ = require("lodash");
const redis = require("redis");

// Setup the local connection to the client
const client = redis.createClient();

exports.incidentDetail = (req,res) => {
  // Decode the incident number and escape it to avoid SQL injection attacks.
  let incidentnumber = sqlString.escape(decodeURIComponent(req.params.incidentnumber));
  const db = req.db;
  console.log(`Incident Number: ${incidentnumber}`);

  client.get(incidentnumber,(err,info) => {
    if(err) {
      console.log(err);
    }

    if(info) {
    }
    else {
      // No cached value.  Query the database
      db.poolConnect.then((p) => {
        let request = db.pool.request();

        let queryString = `select * from vIncidents where Incident = ${incidentnumber};
    select * from vIncidentContacts_CCIT where Incident = ${incidentnumber} order by ContactsKey;
    select * from vIncidentProperty where Incident = ${incidentnumber};
    select IncidentNumber,Date,Time,ID,Narrative1,NarrativeKey from Narrative134 where IncidentNumber = ${incidentnumber} order by NarrativeKey;`;

        request.query(queryString,function(err,result) {
          if(err) {
            console.log(err);
          }
          else {
            let r = {
              detail: result.recordsets[0][0],
              contacts: result.recordsets[1],
              property: result.recordsets[2],
              narratives: result.recordsets[3]
            };
            client.set(incidentnumber,JSON.stringify(r),'EX',120);
            res.send([r]);
          }
        });
      });
    }
  });
};

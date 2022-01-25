/**
 *
 */

// Include libraries for this module
const sqlString = require("tsqlstring");
const _ = require("lodash");

function escapeParams(params) {
  // Create an empty object to hold the escaped parameters.
  let localParams = {};

  // Escape each individual search paramenter and copy it to localParams
  _.each(params,(value,key) => {
    // Only escape the strings
    if(_.isString(value)) {
      localParams[key] = sqlString.escape(value);
    }
    else {
      localParams[key] = value;
    }
  });

  // Return the cleaned up search parameters.
  return localParams;
}

/**
 * Vehicle Search Controller
 */
exports.vehicleFecth = (req,res) => {
  console.log("Vehicle Search Controller");
  console.log(req.body.terms);
  // Escape all of the search parameters sent in the API call.
  let params = req.body.terms;

  // Get the db helpers
  const db = req.db;

  // Build the WHERE clause of the search query
  let whereClause = ``; // Start with an empty string and add parts if they are in the search params

  whereClause += ` FileNumber like '` + (params.FileNumber || "%") + `' and`;
  whereClause += ` IncidentNumber like '` + (params.IncidentNumber || "%") + `' and`;
  whereClause += ` VehicleYear like '` + (params.VehicleYear || "%") + `' and`;
  whereClause += ` VehicleMake like '` + (params.make || "%") + `' and`;
  whereClause += ` VehicleModel like '` + (params.VehicleModel || "%") + `' and`;
  whereClause += ` TagNumber like '` + (params.TagNumber || "%") + `' and`;

  whereClause = whereClause.slice(0,-4);

  whereClause = whereClause.replace(/\*/g,'%');

  console.log(whereClause);

  // Construct the SQL query from the where clause and paging information in the `params` object
  let query = `select FileNumber,IncidentNumber,VehicleYear,VehicleMake,VehicleModel,TagNumber from Vehicles where${whereClause} order by TagNumber asc offset ${params.recordOffset} rows fetch next ${params.fetchSize} rows only; select count(*) as Count from Vehicles where${whereClause};`;
  console.log(query);

  db.poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      req.audit({
        information: `Successful search ${query}`,
        outcome: true
      });
      res.status(200).send(recordset);
    });
  });
};

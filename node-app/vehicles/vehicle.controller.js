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
exports.vehicleFeath = (req,res) => {
  console.log("Vehicle Search Controller");
  // Escape all of the search parameters sent in the API call.
  let params = escapeParams(req.body.params);
  let paging = escapeParams(req.body.paging);

  // Get the db helpers
  const db = req.db;

  // Build the WHERE clause of the search query
  let whereClause = ``; // Start with an empty string and add parts if they are in the search params

  whereClause += ` FileNumber like '` + (params.FileNumber || "%") + `' and`;
  whereClause += ` IncidentNumber like '` + (params.IncidentNumber || "%") + `' and`;
  whereClause += ` VehicleYear like '` + (params.VehicleYear || "%") + `' and`;
  whereClause += ` VehicleMake like '` + (params.VehicleMake || "%") + `' and`;
  whereClause += ` VehicleModel like '` + (params.VehicleModel || "%") + `' and`;
  whereClause += ` TagNumber like '` + (params.TagNumber || "%") + `' and`;

  console.log(whereClause);
};

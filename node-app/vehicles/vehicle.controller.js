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

  // Is there a FileNumber in the search terms?
  if(params.name) {
    // Yes!  Add that to the WHERE clause
    whereClause += ` FileNumber like '` + params.name + `' and`;
  }

  // Is there an IncidentNumber in the search terms?
  if(params.incident) {
    whereClause += ` IncidentNumber like '` + params.incident + `' and`;
  }

  // Is there a VehicleYear in the search terms?
  if(params.year) {
    // Yes!  Add vehicle year to the WHERE clause
    whereClause += ` VehicleYear like '` + (params.year || "%") + `' and`;
  }

  // Is there a VehicleMake in the search terms?
  if(params.make) {
    // Yes!  Add vehicle make to the WHERE clause.
    whereClause += ` VehicleMake like '` + params.make + `' and`;
  }

  // Is there a VehicleModel in the search terms?
  if(params.model) {
    // Yes!  Add vehicle model to the WHERE clause.
    whereClause += ` VehicleModel like '` + params.model + `' and`;
  }

  // Is there TagNumber in the search terms?
  if(params.license) {
    whereClause += ` TagNumber like '` + params.license + `' and`;
  }

  // Add something to the WHERE clause so that the SQL query doesn't break.
  whereClause += ` 1=1`;

  // Convert any * to % for SQL query
  whereClause = whereClause.replace(/\*/g,'%');

  console.log(whereClause);

  // Construct the SQL query from the where clause and paging information in the `params` object
  let query = `SELECT IncidentNumber,FileNumber,ContactDate,VehicleYear,VehicleMake,VehicleModel,VehicleStyle,VehicleColor,TagNumber,TagState,TagYear,ID,VehInvolvement,Location,Comments FROM Vehicles WHERE${whereClause} ORDER BY VehiclesKey ASC OFFSET ${params.recordOffset} ROWS FETCH NEXT ${params.fetchSize} ROWS ONLY; select count(*) as Count from Vehicles where${whereClause};`;
  console.log(query);

  db.poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      // Log the search in the audit system
      req.audit({
        information: `Successful search ${query}`,
        outcome: true
      });

      // Process the record set into the JSON results object
      let rows = [];
      let count = recordset.recordsets[1][0].Count;

      _.forEach(recordset.recordsets[0],(record) => {
        rows.push({
          incident: record.IncidentNumber,
          file: record.FileNumber,
          contactDate: record.contactDate,
          year: record.VehicleYear,
          make: record.VehicleMake,
          model: record.VehicleModel,
          style: record.VehicleStyle,
          color: record.VehicleColor,
          license: record.TagNumber,
          licenseState: record.TagState,
          licenseYear: record.TagYear,
          id: record.ID,
          involvement: record.VehInvolvement,
          location: record.Location,
          comments: record.Comments
        });
      });

      res.status(200).send({
        rows: rows,
        count: count
      });
    });
  });
};

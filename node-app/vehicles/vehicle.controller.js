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

  // Is there a VehicleStyle in the search terms?
  if(params.style) {
    // Yes!  Add vehicle style to the WHERE clause.
    whereClause += ` VehicleStyle like '${params.style}' AND`;
  }

  // Is there a VehicleColor in the search terms?
  if(params.color) {
    // Yes!  Add vehicle color to the WHERE clause.
    whereClause += ` VehicleColor like '${params.color}' AND`;
  }

  // Is there TagNumber in the search terms?
  if(params.license) {
    whereClause += ` TagNumber like '` + params.license + `' and`;
  }

  // Is there a TagYear in the search terms?
  if(params.licenseYear) {
    whereClause += ` TagYear like '${params.licenseYear}' and`;
  }

  // Is there a TagState in the search terms?
  if(params.licenseState) {
    whereClause += ` TagState like '${params.licenseState}' and`;
  }

  // Add something to the WHERE clause so that the SQL query doesn't break.
  whereClause += ` 1=1`;

  // Convert any * to % for SQL query
  whereClause = whereClause.replace(/\*/g,'%');

  console.log(whereClause);

  // Construct the SQL query from the where clause and paging information in the `params` object
  let query = `SELECT IncidentNumber,FileNumber,ContactDate,VehicleYear,VehicleMake,VehicleModel,VehicleStyle,VehicleColor,TagNumber,TagState,TagYear,ID,VehInvolvement,Location,Comments,VehiclesKey FROM Vehicles WHERE${whereClause} ORDER BY VehiclesKey ASC OFFSET ${params.recordOffset} ROWS FETCH NEXT ${params.fetchSize} ROWS ONLY; select count(*) as Count from Vehicles where${whereClause};`;
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
          comments: record.Comments,
          vehiclesKey: record.VehiclesKey
        });
      });

      res.status(200).send({
        rows: rows,
        count: count
      });
    });
  });
};

exports.vehicleDetail = (req,res) => {
  let vehicleKey = sqlString.escape(decodeURIComponent(req.params.vehiclekey));
  console.log("Vehicle Detail",vehicleKey);
  const db = req.db;

  // Build the query for the vehicle details
  //let query = `SELECT V.FileNumber,CONCAT(N.LastName,', ',N.First,' ',N.Middle) AS operatorName,V.IncidentNumber,V.ContactDate,V.VehicleYear,V.VehicleMake,V.VehicleModel,V.VehicleStyle,V.VehicleColor,V.VehInvolvement,V.TagNumber,V.TagState,V.TagYear,V.ID,V.Location,V.VIN,V.ReleaseDate,V.Comments FROM Vehicles AS V INNER JOIN Name AS N ON V.FileNumber=N.FileNumber WHERE V.VehiclesKey=${vehicleKey}`;
  let query = `SELECT * FROM Vehicles WHERE VehiclesKey=${vehicleKey};
SELECT LastName,First,Middle FROM Name WHERE FileNumber IN (SELECT FileNumber FROM Vehicles WHERE VehiclesKey=${vehicleKey});`;

  console.log("Query: ",query);

  db.poolConnect.then((p) => {
    let request = db.pool.request();

    request.query(query,function(err,result) {
      // Check for an error
      if(err) {
        // Print the error
        req.audit({
          information: queryString,
          outcome: false
        });
        console.log(err);
      }
      else {
        // Query was Successful.  Process and return to front-end
        // Log the success first
        req.audit({
          information: `Retrieved vehicle record: ${vehicleKey}`,
          outcome: true
        });

        console.log(result);
        let vehicle = result.recordsets[0][0];
        let name = result.recordsets[1][0];
        console.log(name)

        let operatorName = ``;
        if(name) {
          operatorName = `${name.LastName}, ${name.First} ${name.Middle}`;
        }

        let info = {
          vehicle: {
            fileNumber: vehicle.FileNumber,
            operatorName: operatorName,
            incidentNumber: vehicle.IncidentNumber,
            contactDate: vehicle.ContactDate,
            year: vehicle.VehicleYear,
            make: vehicle.VehicleMake,
            model: vehicle.VehicleModel,
            style: vehicle.VehicleStyle,
            color: vehicle.VehicleColor,
            involvement: vehicle.VehInvolvement,
            tag: vehicle.TagNumber,
            tagState: vehicle.TagState,
            tagYear: vehicle.TagYear,
            officerId: vehicle.ID,
            location: vehicle.Location,
            vin: vehicle.VIN,
            releaseDate: vehicle.ReleaseDate,
            recoveredValue: vehicle.RecoveredValue,
            recoveredDate: vehicle.RecoveredDate,
            towedBy: vehicle.TowedBy
          }
        };

        res.status(200).send(info);
      }
    });
  });
};

exports.vehicleLookups = (req,res) => {
  console.log("Vehicle Lookups Controller");
  // This controller queries the Justice lookup table for values related to vehicle entries.
  // Specifically:
  // - VehicleMake values
  // - VehicleModel values
  // - VehicleStyle values
  // - VehicleColor values
  // - VehInvolvement values

  let queries = ``;

  // 0 - Query the vehicle make values
  queries += `SELECT DISTINCT L.Value,L.Description FROM Vehicles AS V LEFT OUTER JOIN [Lookup] AS L ON V.VehicleMake = L.Value WHERE L.Name='VehicleMake' ORDER BY L.Description ASC;`;

  // 1 - Query the vehicle model values
  queries += ` SELECT Name,Value,ISNULL(Description,Value) AS Description,Description2 FROM Lookup WHERE Name='VehicleModel' ORDER BY Description ASC;`;

  // 2 - Query the vehicle style values
  queries += ` SELECT Name,Value,ISNULL(Description,Value) AS Description FROM Lookup WHERE Name='VehicleStyle' ORDER BY Description ASC;`;

  // 3 - Query the vehicle color values
  queries += ` SELECT Name,Value,ISNULL(Description,Value) AS Description FROM Lookup WHERE Name='VehicleColor' ORDER BY Description ASC;`;

  // 4 - Query the vehicle involvement values
  queries += ` SELECT Name,Value,ISNULL(Description,Value) AS Description FROM Lookup WHERE Name='VehInvolvement' ORDER BY Description ASC;`;

  console.log("Query",queries);

  // Get the db helpers
  const db = req.db;

  // Setup the results object
  let lookups = {
    makes: [],
    models: [],
    styles: [],
    colors: [],
    involvements: []
  };

  // Query the database
  db.poolConnect.then((p) => {
    // Setup the request from the connection pool
    let request = p.request();

    // Send the query and wait for the reply
    request.query(queries).then((recordsets) => {
      // Log the search in the audit system
      req.audit({
        information: `Successful request for vehicle lookups`,
        outcome: true
      });

      // Process the record sets into the results object
      lookups.raw = recordsets.recordsets;
      // Process the makes
      _.forEach(recordsets.recordsets[0],(make) => {
        lookups.makes.push({
          value: make.Value,
          description: make.Description
        });
      });

      // Process the models
      _.forEach(recordsets.recordsets[1],(model) => {
        lookups.models.push({
          value: model.Value,
          description: model.Description || model.Value,
          make: model.Description2
        });
      });

      // Process the styles
      _.forEach(recordsets.recordsets[2],(style) => {
        lookups.styles.push({
          value: style.Value,
          description: style.Description
        });
      });

      // Process the colors
      _.forEach(recordsets.recordsets[3],(color) => {
        lookups.colors.push({
          value: color.Value,
          description: color.Description
        });
      });

      // Process the involvements
      _.forEach(recordsets.recordsets[4],(involvement) => {
        lookups.involvements.push({
          value: involvement.Value,
          description: involvement.Description
        });
      });

      // Cache the results
      req.cache.set(req.originalUrl,JSON.stringify(lookups),'EX',req.cacheExpire,() => {
        console.log("Vehicle Lookups Save to Cache");
      });


      // Send back the results
      res.status(200).send(lookups);
    });
  })
};

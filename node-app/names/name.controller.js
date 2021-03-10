/**
 *
 */

// Include libraries for this module
const sqlString = require("tsqlstring");
const _ = require("lodash");

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

  // No cached value.  Query the database
  db.poolConnect.then((p) => {
    let request = db.pool.request();

    let queryString = `select * from Name where FileNumber = ${filenumber}; select * from vNameContacts where FileNumber=${filenumber};`;

    // Need to add logic for handling if a record is an alias.  AKAYN='Y'

    // Otherwise, search for aliases of this name record
    queryString += ` select FileNumber,LastName,First,Addr_Concat,SSN from Name where RelatedFileNumber LIKE ${filenumber};`;

    queryString += ` SELECT n1.FileNumber as FileNumber,c1.Incident as Incident,n1.DOB as DOB,n1.First as FirstName,n1.Middle as MiddleName,n1.LastName as LastName,c1.ContactDate as Date,c1.Involvement as Involvement,c1.OffenseDesc as OffenseDesc,c1.Loc_Concat as Location FROM Name as n1 INNER JOIN Contacts as c1 ON n1.FileNumber = c1.FileNumber WHERE n1.FileNumber <> ${filenumber} AND c1.Incident <> '' AND c1.Incident IN (SELECT Incident FROM Name as n INNER JOIN Contacts as c ON n.FileNumber = c.FileNumber WHERE n.FileNumber = ${filenumber}) ORDER BY c1.Incident;`;

    console.log("Query: ",queryString);

    request.query(queryString,function(err,result) {
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
        // Query was succesful.  Process and return to front-end
        // Log the success first
        req.audit({
          information: `Retrieved name record: ${filenumber}`,
          outcome: true
        });
        let r = [{
          detail: result.recordsets[0][0],
          contacts: result.recordsets[1],
          aliases: result.recordsets[2],
          associates: result.recordsets[3]
        }];
        req.cache.set(req.originalUrl,JSON.stringify(r),'EX',req.cacheExpire,() => {
          console.log("Information saved to cache");
        });
        res.send(r);
      }
    });
  });
};

/**
 * Name fetch controller
 */
exports.nameFetch = (req,res) => {
  console.log('Fetching Names');
  console.log(req.body.terms);
  let params = req.body.terms;
  const db = req.db;

  let whereClause = ``;

  // Add in the terms from the parameters or use a placeholder if they are missing.
  // I used the placeholder of '%' here in the event of wanting *all* of the names.
  whereClause += _.isString(params.lastName) && params.lastName !== "" ? ` LastName like '${params.lastName}' and` : ` LastName like '%' and`;
  whereClause += _.isString(params.firstName) && params.firstName !== "" ? ` First like '${params.firstName}' and` : ` First like '%' and`;
  whereClause += _.isString(params.middleName) && params.middleName !== "" ? ` Middle like '${params.middleName}' and` : ` Middle like '%' and`;

  // Remove any trailing ' and' at the end of the query string
  whereClause = whereClause.slice(0,-4);

  // Replace asterisks (*) with percent signs (%)
  whereClause = whereClause.replace(/\*/g,'%');

  // Setup the query string with the where where clause
  // Add in the order by, offset, and fetch next statements as well as the Count query for a total count of Name records.
  let query = `select FileNumber,LastName,First,Middle,DOB from Name where${whereClause} order by LastName,First,Middle asc offset ${params.recordOffset} rows fetch next ${params.fetchSize} rows only; select count(*) as Count from Name where${whereClause};`;

  db.poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      req.audit({
        information: `Successful search: ${query}`,
        outcome: true
      });
      res.status(200).send(recordset);
    },(err) => {
      console.log(err);
      req.audit({
        information: `Name search error see logs`,
        outcome: false
      });
      res.status(500).send(err);
    }).finally(() => {
      console.log(`Name search query complete.`);
    });
  });
};

/**
 * Name search controller
 */
exports.nameSearch = (req,res) => {
  console.log("Name Search Controller...");
  let params = req.body;
  const db = req.db;

  if(params.fileNumber) {
    // Search by file number if it exists
  }
  else {
    // Search by name fields

    let sqlStr = `select FileNumber,LastName,First,Middle,DOB from Name where`;
    sqlStr += _.isString(params.lastName) && params.lastName !== "" ? ` LastName like '${params.lastName}' and` : "";
    sqlStr += _.isString(params.firstName) && params.firstName !== "" ? ` First like '${params.firstName}' and` : "";
    sqlStr += _.isString(params.middleName) && params.middleName !== "" ? ` Middle like '${params.middleName}' and` : "";

    //console.log(sqlStr);
    //console.log(sqlStr.split(' ').pop());

    // Trim off the trailing 'and' and and a ';'
    sqlStr = sqlStr.slice(0,-4);
    sqlStr += " order by LastName,First,Middle;";

    // Change any asterisks to per-cent signs
    sqlStr = sqlStr.replace(/\*/g,'%');

    // Log the search string for posterity
    console.log(sqlStr);

    // Query the database
    db.poolConnect.then((p) => {
      let request = p.request();

      request.query(sqlStr).then(function(recordset) {
        console.log('Query complete!');
        res.send(recordset);
      });
    });
  }
};

/**
 * Name File Associates Controller
 *  This controller will get name files associated with the
 *  incidents associated with the specified name FileNumber.
 */
exports.nameAssociates = (req,res) => {
  console.log("Name Associates Controller...");

  let incidents = [];
  let associates = [];

  // Step 0 - Get the FileNumber from the GET params.

  // Step 1 - Get the incidents associated with the supplied FileNumber

  // Step 2 - For each incident, get the list of FileNumbers associated with
  // that Incident

  // Step 3 - ????

  // Step 4 - Profit

  // Step 5 - Compile results and send in response
};

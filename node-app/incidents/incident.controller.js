/**
 *
 */

// Include libraries for this module
const sqlString = require("tsqlstring");
const _ = require("lodash");

exports.incidentDetail = (req,res) => {
  // Decode the incident number and escape it to avoid SQL injection attacks.
  let incidentnumber = sqlString.escape(decodeURIComponent(req.params.incidentnumber));
  const db = req.db;
  console.log(`Incident Detail Number: ${incidentnumber}`);

  db.poolConnect.then((p) => {
    let request = db.pool.request();

    let queryString = `select * from vIncidents where Incident = ${incidentnumber};
select * from vIncidentContacts_CCIT where Incident = ${incidentnumber} order by ContactsKey;
select * from vIncidentProperty where Incident = ${incidentnumber};
select IncidentNumber,Date,Time,ID,Narrative1,NarrativeKey from Narrative134 where IncidentNumber = ${incidentnumber} order by NarrativeKey;`;

    request.query(queryString,function(err,result) {
      if(err) {
        req.audit({
          information: `Incident detail retrieval error see logs`,
          outcome: false
        });
        console.log(err);
      }
      else {
        req.audit({
          information: `Incident detail retrieved: ${incidentnumber}`,
          outcome: true
        });
        let r = [{
          detail: result.recordsets[0][0],
          contacts: result.recordsets[1],
          property: result.recordsets[2],
          narratives: result.recordsets[3]
        }];
        req.cache.set(req.originalUrl,JSON.stringify(r),'EX',req.cacheExpire,() => {
          console.log("Information saved to cache");
        });
        res.status(200).send(r);
      }
    });
  });
};

/**
 * This handler expects a POST request with two parameters.
 * The first parameter is the offset into the select.
 * The second parameter is the fetch size of the select.
 * The third parameter are the search terms.
 */
exports.incidentFetch = (req,res) => {
  let params = req.body.terms;
  let db = req.db;

  console.log("Starting incident fetch");

  let whereClause = "";

  //params.incident = sqlString.escape(params.incident);

  // Check to see if there is an incident number in the search terms
  let whereClauseBuilder = "";
  if(_.has(params,"incident") && _.isString(params.incident) && params.incident !== "") {
    whereClauseBuilder += sqlString.format(" Incident like ? and",[params.incident]);
  }

  // Check to see if there is an officer ID in the search terms
  if(_.has(params,"officer") && _.isString(params.officer) && params.officer !== "") {
    whereClauseBuilder += sqlString.format(" ID like ? and",[params.officer]);
  }

  // Check to see if there is a reviwer ID in the search terms
  if(_.has(params,"reviewer") && _.isString(params.reviewer) && params.reviewer !== "") {
    whereClauseBuilder += sqlString.format(" Reviewer like ? and",[params.reviewer]);
  }

  // Check to see if there is an offense in the search terms
  if(_.has(params,"offense") && _.isString(params.offense) && params.offense !== "") {
    whereClauseBuilder += sqlString.format(" Offense like ? and",[params.offense]);
  }

  // Check to see if there is a date range in the search terms
  if(_.has(params,"reportDateBegin") && _.isString(params.reportDateBegin) && params.reportDateBegin !== ""
    && _.has(params,"reportDateEnd") && _.isString(params.reportDateEnd) && params.reportDateEnd !== "") {
    whereClauseBuilder += sqlString.format(" RptDate between convert(datetime,?) and convert(datetime,?) and",[params.reportDateBegin,params.reportDateEnd]);
  }

  // Add an extra truthy statement to make the query work if the search terms are empty
  whereClauseBuilder += " 1=1 and"

  // Trim off the trailing `add`
  whereClauseBuilder = whereClauseBuilder.slice(0,-4);

  whereClause = ` where${whereClauseBuilder}`;

  // Replace asterisks (*) with percent signs (%)
  whereClause = whereClause.replace(/\*/g,'%');

  let query = `select Incident,RptDate,RptTime,Offense,OffenseDesc,ID,Reviewer as ReviewerID from Incident${whereClause} order by RptDate,RptTime,BeginDate,BeginTime,EndDate,EndTime asc offset ${params.recordOffset} rows fetch next ${params.fetchSize} rows only; select count(*) as Count from Incident${whereClause};`;

  db.poolConnect.then((p) => {
    let request = p.request();

    request.query(query).then((recordset) => {
      req.audit({
        information: `Successful incident search: ${query}`,
        outcome: true
      });
      res.send(recordset);
    },(err) => {
      req.audit({
        information: `Incident search error see logs`,
        outcome: false
      });
      console.log(err.originalError.code,err.originalError.message);
    }).finally(() => {
      console.log(`Incident search query completed.`);
    });
  });

  console.log(`Search query: ${query}`);
};

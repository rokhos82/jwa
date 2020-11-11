export function incidentService($resource) {
  let _service = {
    getIncidentDetail: function(incidentnumber) {
      console.log(`Name Serivce getIncidentDetail: ${incidentnumber}`);
      let detail = $resource('http://localhost:8001/incidents/detail/:incidentnumber',{
        incidentnumber: encodeURIComponent(incidentnumber)
      });

      console.log(detail);

      let promise = detail.query().$promise;

      return promise;
    },
    getIncidents: function(terms) {
      let list = $resource("http://localhost:8001/incidents/fetch",{});

      let promise = list.save({},terms).$promise;

      return promise;
    }
  };

  return _service;
}

incidentService.$inject = ["$resource"];
export function incidentService($resource) {
  let _service = {
    masterIncidentTop1000: function() {
      let list = $resource("http://localhost:8001/incidents",{});

      let promise = list.query().$promise;

      return promise;
    }
  };

  return _service;
}

incidentService.$inject = ["$resource"];

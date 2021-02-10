export function incidentService($resource,server,port,userService) {
  let _service = {
    getIncidentDetail: function(incidentnumber) {
      console.log(`Incident Service getIncidentDetail: ${incidentnumber}`);
      /*let detail = $resource(`http://${server}:${port}/incidents/detail/:incidentnumber`,{
        incidentnumber: encodeURIComponent(incidentnumber)
      });//*/

      let token = userService.getToken();
      console.log(token);

      let detail = $resource(`http://${server}:${port}/incidents/detail/:incidentnumber`,{},{
        get: {
          method: "GET",
          headers: {
            "x-access-token": token
          },
          params: {
            incidentnumber: encodeURIComponent(incidentnumber)
          },
          isArray: true
        }
      });

      console.log(detail);

      let promise = detail.get().$promise;

      return promise;
    },
    getIncidents: function(terms) {
      let list = $resource(`http://${server}:${port}/incidents/fetch`,{});

      let promise = list.save({},{terms: terms}).$promise;

      return promise;
    },
    getNarrative: function(key) {
      let narratives = $resource(`http://${server}:${port}/narratives/:key`,{
        key: encodeURIComponent(key)
      });

      let promise = narratives.query().$promise;

      return promise;
    }
  };

  return _service;
}

incidentService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

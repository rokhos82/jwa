export function incidentService($resource,server,port,userService) {
  let _service = {
    getIncidentDetail: function(incidentnumber) {
      let token = userService.getToken();
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
      let token = userService.getToken();
      let list = $resource(`http://${server}:${port}/incidents/fetch`,{},{
        post: {
          method: "POST",
          headers: {
            "x-access-token": token
          },
          isArray: false
        }
      });

      let promise = list.post({},{terms: terms}).$promise;

      return promise;
    },
    getNarrative: function(key) {
      let token = userService.getToken();
      let narratives = $resource(`http://${server}:${port}/narratives/:key`,{
        key: encodeURIComponent(key)
      },{
        get: {
          method: "GET",
          headers: {
            "x-access-token": token
          },
          isArray: true
        }
      });

      let promise = narratives.get().$promise;

      return promise;
    }
  };

  return _service;
}

incidentService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

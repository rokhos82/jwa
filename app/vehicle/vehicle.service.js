export function vehicleService($resource,server,port,userService) {
  let _service = {};

  _service.getVehicles = (terms) => {
    let token = userService.getToken();
    let username = userService.getUser();

    let list = $resource(`http://${server}:${port}/vehicles/fetch`,{},{
      post: {
        method: "POST",
        headers: {
          "x-access-token": token,
          "username": username
        },
        isArray: false
      }
    });

    let promise = list.post({},{terms: terms}).$promise;

    return promise;
  };

  _service.getVehicleLookups = () => {
    let token = userService.getToken();
    let username = userService.getUser();

    let lookups = $resource(`http://${server}:${port}/vehicles/lookups`,{},{
      get: {
        method: "GET",
        headers: {
          "x-access-token": token,
          "username": username
        },
        isArray: false
      }
    });

    let promise = lookups.get().$promise;

    return promise;
  };

  return _service;
}

vehicleService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

// Service Function Definitions Below
